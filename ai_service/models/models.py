import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

# Dummy data
X = ["python developer", "data scientist", "react frontend", "machine learning engineer"]
y = ["software", "ml", "frontend", "ml"]

vectorizer = CountVectorizer()
X_vec = vectorizer.fit_transform(X)

model = LogisticRegression()
model.fit(X_vec, y)

with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)
with open("job_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Dummy model + vectorizer created successfully")
