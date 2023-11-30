"""empty message

<<<<<<<< HEAD:migrations/versions/e5fa24c72861_.py
Revision ID: e5fa24c72861
Revises: 
Create Date: 2023-11-28 19:23:00.244317
========
Revision ID: 61ad0906d7ae
Revises: 
Create Date: 2023-11-22 17:23:59.960164
>>>>>>>> 18dcec07105a3a1ae4a1765f2105588976eaf8b0:migrations/versions/61ad0906d7ae_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/e5fa24c72861_.py
revision = 'e5fa24c72861'
========
revision = '61ad0906d7ae'
>>>>>>>> 18dcec07105a3a1ae4a1765f2105588976eaf8b0:migrations/versions/61ad0906d7ae_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
<<<<<<<< HEAD:migrations/versions/e5fa24c72861_.py
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('first_name', sa.String(length=80), nullable=False),
    sa.Column('last_name', sa.String(length=80), nullable=False),
    sa.Column('address', sa.String(length=80), nullable=False),
    sa.Column('phone_number', sa.Integer(), nullable=False),
    sa.Column('recovery_code', sa.Integer(), nullable=True),
========
    sa.Column('password', sa.String(length=500), nullable=False),
    sa.Column('first_name', sa.String(length=500), nullable=True),
    sa.Column('last_name', sa.String(length=80), nullable=True),
>>>>>>>> 18dcec07105a3a1ae4a1765f2105588976eaf8b0:migrations/versions/61ad0906d7ae_.py
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('last_services_used',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('service_requested', sa.Enum('walk', 'check_in', 'pet_sitting', name='typeofserviceenum'), nullable=False),
    sa.Column('number_of_days', sa.Integer(), nullable=False),
    sa.Column('starting_day_of_week', sa.String(), nullable=False),
    sa.Column('recurring', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('number_of_services_used',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('walks', sa.Integer(), nullable=False),
    sa.Column('checkins', sa.Integer(), nullable=False),
    sa.Column('pet_sittings', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pet',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('breed', sa.String(length=120), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('detailed_care_info', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pet')
    op.drop_table('number_of_services_used')
    op.drop_table('last_services_used')
    op.drop_table('user')
    # ### end Alembic commands ###
