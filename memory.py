import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase app
cred = credentials.Certificate("memory.json")
firebase_admin.initialize_app(cred)

# Connect to Firestore
db = firestore.client()

def add_question_answer(question, answer, source=None, page_number=None, tags=None):
    """
    Adds a question-answer pair to Firestore with optional metadata.

    Args:
        question (str): The question string.
        answer (str): The answer string.
        source (str, optional): Name of the source file (e.g., PDF).
        page_number (int, optional): Page number from where the answer came.
        tags (list, optional): List of tags like ['ML', 'classification'].
    """
    try:
        doc_ref = db.collection("pdf_qa").document()
        doc_ref.set({
            "question": question,
            "answer": answer,
            "source": source,
            "page_number": page_number,
            "tags": tags if tags else [],
            "created_at": firestore.SERVER_TIMESTAMP
        })
        print(f"✅ Added question: '{question}'")
    except Exception as e:
        print(f"❌ Failed to add question: {e}")

# Sample usage
if __name__ == "__main__":
    add_question_answer(
        question="What is overfitting in machine learning?",
        answer="Overfitting is when a model performs well on training data but poorly on unseen data.",
        source="ml_notes.pdf",
        page_number=42,
        tags=["ML", "overfitting", "generalization"]
    )
