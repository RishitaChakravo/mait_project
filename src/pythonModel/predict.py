import torch 
import pandas as pd
import numpy as np
import joblib
from torch import nn
import pickle
import sys
import json
import disease_predictor
from disease_predictor import data

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

model = DiseaseFinder()
model.load_state_dict(torch.load("src/pythonModel/disease_model.pth", map_location="cpu"))
model.eval()

label_encoder = joblib.load("src/pythonModel/label_encoder.pkl")

columns = data.drop(columns=['Disease']).columns

input_data = json.loads(sys.stdin.read())
symptoms = input_data.get("symptoms", [])

sample = pd.DataFrame(0, index=[0], columns=columns)
for symptom in symptoms:
  if symptom in sample.columns:
    sample[symptom] = 1

sample_tensor = torch.tensor(sample.values, dtype=torch.float32)
with torch.inference_mode():
  output = model(sample_tensor)
  probs = torch.softmax(output, dim=1)
  topk = torch.topk(probs, k=3, dim=1)

topk_probs = topk.values.squeeze().tolist()
topk_indices = topk.indices.squeeze().tolist()
topk_diseases = label_encoder.inverse_transform(np.array(topk_indices))

result = [{"disease": d, "probability": round(p * 100, 2)} for d, p in zip(topk_diseases, topk_probs)]
print(json.dumps({"predictions": result}))

