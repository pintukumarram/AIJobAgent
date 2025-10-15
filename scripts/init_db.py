from backend.app.db.session import engine, Base
# import models so they register with Base.metadata
import backend.app.db.models.user_model
import backend.app.db.models.job_model
import backend.app.db.models.application_model

def init():
    Base.metadata.create_all(bind=engine)
    print("DB initialized (tables created).")

if __name__ == "__main__":
    init()
