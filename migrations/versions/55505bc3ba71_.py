"""empty message

Revision ID: 55505bc3ba71
Revises: 46f658586edd
Create Date: 2023-12-04 23:38:31.450830

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '55505bc3ba71'
down_revision = '46f658586edd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['id'])

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('address',
               existing_type=sa.VARCHAR(length=80),
               nullable=True)
        batch_op.alter_column('phone_number',
               existing_type=sa.VARCHAR(length=80),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('phone_number',
               existing_type=sa.VARCHAR(length=80),
               nullable=False)
        batch_op.alter_column('address',
               existing_type=sa.VARCHAR(length=80),
               nullable=False)

    with op.batch_alter_table('pet', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###
