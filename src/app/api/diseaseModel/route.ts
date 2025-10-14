import { spawn } from "child_process"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { symptoms } = await request.json()
    console.log("✅ Received symptoms from frontend:", symptoms)

    if (!symptoms || symptoms.length === 0) {
      return NextResponse.json(
        { message: "At least one symptom is required to predict" },
        { status: 400 }
      )
    }

    return new Promise((resolve) => {
      const py = spawn("python", ["src/pythonModel/predict.py"])
      console.log("🚀 Python process started...")

      let output = ""
      let error = ""

      py.stdout.on("data", (data) => {
        console.log("📤 Python output chunk:", data.toString())
        output += data.toString()
      })

      py.stderr.on("data", (data) => {
        console.error("❌ Python error output:", data.toString())
        error += data.toString()
      })

      py.on("close", (code) => {
        console.log("🧩 Python process exited with code:", code)
        if (code !== 0) {
          console.error("Python failed:", error)
          resolve(
            NextResponse.json({
              success: false,
              message: "Python script failed",
              error,
            })
          )
        } else {
          try {
            console.log("🔍 Raw output:", output)
            const result = JSON.parse(output)
            resolve(
              NextResponse.json({
                success: true,
                predictions: result.predictions,
              })
            )
          } catch (err) {
            console.error("⚠️ Error parsing Python output:", output)
            resolve(
              NextResponse.json({
                success: false,
                message: "Invalid output from Python script",
                output,
              })
            )
          }
        }
      })

      py.stdin.write(JSON.stringify({ symptoms }))
      py.stdin.end()
    })
  } catch (error) {
    console.error("🔥 Internal Server Error", error)
    return NextResponse.json(
      {
        success: false,
        message: "Server Error: Error predicting the disease",
      },
      { status: 500 }
    )
  }
}
