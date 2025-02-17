from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from Bio import SeqIO

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "https://potential-barnacle-p97q44vjq9526j6p-3000.app.github.dev"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Mock disease marker database
disease_markers = {
    "AAA": "Disease A",
    "CCC": "Disease B",
    "GGG": "Disease C"
}

def analyze_rna_sequence(filepath):
    sequence = SeqIO.read(filepath, "fasta")
    rna_seq = str(sequence.seq)

    markers_found = {}
    for marker, disease in disease_markers.items():
        if marker in rna_seq:
            markers_found[marker] = disease

    return markers_found, rna_seq

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(filepath, "wb") as f:
        f.write(await file.read())
    markers_found, rna_seq = analyze_rna_sequence(filepath)
    return JSONResponse(content={"markers_found": markers_found, "rna_seq": rna_seq})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)