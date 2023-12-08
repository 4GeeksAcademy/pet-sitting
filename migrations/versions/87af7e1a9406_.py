"""empty message

Revision ID: 87af7e1a9406
Revises: 994808a6ed56
Create Date: 2023-12-08 23:51:58.478220

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '87af7e1a9406'
down_revision = '994808a6ed56'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###
