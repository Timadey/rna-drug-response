from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Bio import pairwise2
from Bio.pairwise2 import format_alignment

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "https://potential-barnacle-p97q44vjq9526j6p-8000.app.github.dev",
    "https://potential-barnacle-p97q44vjq9526j6p-3000.app.github.dev"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AlignmentRequest(BaseModel):
    sequence1: str
    sequence2: str
    alignment_type: str  # "global" or "local"

@app.post("/align")
async def align_sequences(request: AlignmentRequest):
    seq1 = request.sequence1
    seq2 = request.sequence2
    alignment_type = request.alignment_type

    if alignment_type not in ["global", "local"]:
        raise HTTPException(status_code=400, detail="Invalid alignment type. Must be 'global' or 'local'.")

    if alignment_type == "global":
        alignments = pairwise2.align.globalxx(seq1, seq2)
    else:
        alignments = pairwise2.align.localxx(seq1, seq2)

    formatted_alignments = [format_alignment(*alignment) for alignment in alignments]

    return {"alignments": formatted_alignments}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)