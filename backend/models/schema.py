from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.database import Base
from sqlalchemy.ext.declarative import declarative_base

class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    username = Column(String, unique=True, nullable=False)  # <-- Add this line
    password = Column(String, nullable=False)               # <-- Add this line if not present
    is_admin = Column(Integer, nullable=False)
    department = Column(String, nullable=False)

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "is_admin": self.is_admin,
            "department": self.department,
            "full_name": f"{self.first_name} {self.last_name}"
        }

class Account(Base):
    __tablename__ = 'accounts'

    account_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    undertaking = Column(String, nullable=False)
    business_unit = Column(String, nullable=False)

    cases = relationship("Case", back_populates="account")

    def to_dict(self):
        return {
            "account_id": self.account_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "address": self.address,
            "undertaking": self.undertaking,
            "business_unit": self.business_unit
        }

class Case(Base):
    __tablename__ = 'cases'
    id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey('accounts.account_id'), nullable=False)
    created_user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    assigned_user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    status = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    subcategory = Column(String, nullable=False)

    account = relationship("Account", back_populates="cases")
    created_user = relationship("User", foreign_keys=[created_user_id])
    assigned_user = relationship("User", foreign_keys=[assigned_user_id])
    updates = relationship("Update", back_populates="case")

    def to_dict(self):
        return {
            "id": self.id,
            "account_id": self.account_id,
            "created_user_id": self.created_user_id,
            "assigned_user_id": self.assigned_user_id,
            "status": self.status,
            "description": self.description,
            "category": self.category,
            "subcategory": self.subcategory
        }

class Update(Base):
    __tablename__ = 'updates'

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    case_id = Column(Integer, ForeignKey('cases.id'), nullable=False)
    update_description = Column(Text, nullable=False)

    case = relationship("Case", back_populates="updates")
    created_user = relationship("User")

    def to_dict(self):
        return {
            "id": self.id,
            "created_user_id": self.created_user_id,
            "case_id": self.case_id,
            "update_description": self.update_description
        }
    