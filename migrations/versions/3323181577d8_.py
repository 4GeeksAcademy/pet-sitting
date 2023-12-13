"""empty message

Revision ID: 3323181577d8
Revises: 88675695c33a
Create Date: 2023-12-10 22:32:12.703063

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3323181577d8'
down_revision = '88675695c33a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('state', sa.String(length=80), nullable=True))
        batch_op.add_column(sa.Column('zip', sa.String(), nullable=True))
        batch_op.alter_column('phone_number',
               existing_type=sa.INTEGER(),
               type_=sa.String(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('phone_number',
               existing_type=sa.String(),
               type_=sa.INTEGER(),
               existing_nullable=True)
        batch_op.drop_column('zip')
        batch_op.drop_column('state')

    # ### end Alembic commands ###