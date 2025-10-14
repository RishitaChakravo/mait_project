import torch
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from torch import nn
import joblib

import os
csv_path = os.path.join(os.path.dirname(__file__), "DiseaseAndSymptoms.csv")
df = pd.read_csv(csv_path)

df.dropna(axis=1, inplace=True)

# use get.dummies() for onehotencoding
df = pd.get_dummies(df, columns=['Symptom_1', 'Symptom_2', 'Symptom_3'], drop_first=True, dtype=int)

# renamed the columns and removed the prefixs from the feature names
df_renamed = df.copy()
df_renamed = df_renamed.rename(columns=lambda x: x.replace("Symptom_1_ ", "").replace("Symptom_2_ ", "").replace("Symptom_3_ ", "").replace("Symptom_1_", ""))

df_cleaned = df_renamed.groupby(axis=1, level=0).max()
df_cleaned['Disease'] = df["Disease"]

data = df_cleaned

# divide the data into features and label
X = data.drop(columns=['Disease'])
y = data['Disease']
X = X.to_numpy()

from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()

# encoding the labels to indices
y_encoded = le.fit_transform(y)

# converting to tensors
y = torch.tensor(y_encoded, dtype=torch.long)
X = torch.tensor(X, dtype=torch.float32)

# divide train and test data
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# print(X_train.shape)
class DiseaseFinder(nn.Module):
  def __init__(self):
    super().__init__()
    self.net = nn.Sequential(
      nn.Linear(in_features=72, out_features=256),
      nn.ReLU(),
      nn.Dropout(p=0.3),               

      nn.Linear(in_features=256, out_features=128),
      nn.ReLU(),
      nn.Dropout(p=0.3),               

      nn.Linear(in_features=128, out_features=64),
      nn.ReLU(),
      nn.Dropout(p=0.3),               

      nn.Linear(in_features=64, out_features=41)  
  )
  def forward(self, X : torch.Tensor) -> torch.Tensor:
    return self.net(X)
model_1 = DiseaseFinder()

# loss function and optimizer
loss_fn = nn.CrossEntropyLoss()
# used Adam as SGD didn't work
optimizer = torch.optim.Adam(params = model_1.parameters(), lr=0.001)

# accuracy function
def accuracy_fn(y_true, y_pred):
  correct = torch.eq(y_true, y_pred).sum().item()
  acc = (correct/len(y_pred)) * 100
  return acc

epochs = 100
for epoch in range(epochs):
  model_1.train()
  y_logits = model_1(X_train).squeeze()
  y_preds = torch.softmax(y_logits, dim=1).argmax(dim=1)

  loss = loss_fn(y_logits, y_train)
  acc = accuracy_fn(y_true=y_train,
                    y_pred=y_preds)

  optimizer.zero_grad()
  loss.backward()
  optimizer.step()

  model_1.eval()
  with torch.inference_mode():
    test_logits = model_1(X_test).squeeze()
    test_preds = torch.softmax(test_logits, dim=1).argmax(dim=1)
    test_loss = loss_fn(test_logits, y_test)
    test_acc = accuracy_fn(y_true=y_test,
                           y_pred=test_preds)
  # if epoch % 10 == 0:
  #   print(f"Epoch: {epoch} | loss : {loss:.4f} | Acc: {acc:.2f}% | test_loss: {test_loss:.4f} | test_acc : {test_acc:.2f}%")

torch.save(model_1.state_dict(), "disease_model.pth")
joblib.dump(le, "label_encoder.pkl")

# patient_symptoms = ['cough', 'chills', 'continuous_sneezing']
# sample = pd.DataFrame(0, index=[0], columns=data.drop(columns=['Disease']).columns)

# for symptom in patient_symptoms:
#   if symptom in sample.columns:
#     sample[symptom] = 1

# sample = np.array(sample)
# sample = torch.from_numpy(sample).float()

# model_1.eval()
# with torch.inference_mode():
#   output = model_1(sample)
#   probs = torch.softmax(output, dim=1)

# topk = torch.topk(probs, k=3, dim=1)  
# topk_probs = topk.values.squeeze().tolist()
# topk_indices = topk.indices.squeeze().tolist()

# topk_diseases = le.inverse_transform(topk_indices)

# for disease, prob in zip(topk_diseases, topk_probs):
#     print(f"{disease}: {prob*100:.2f}%")

