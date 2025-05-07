from sqlalchemy.orm import declarative_base, sessionmaker, scoped_session
from sqlalchemy import create_engine

Base = declarative_base()
engine = create_engine('sqlite:///database.db', echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db_session = scoped_session(SessionLocal)