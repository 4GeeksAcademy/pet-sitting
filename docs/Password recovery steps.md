Back-end

steps
1. add a recovery code to the User Model on the Models.py.
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    recovery_code=db.Column(db.Integer, unique=False, nullable=True)

2. route that takes in user email verifiys email exists generates a random number ( 4 didgits or more) same route will store the 4 didgit number on the user to wich the email belongs to.[POST request Method]
   - after the code is in the data base , send the code to the user email provided. 
3.  another route to change the password, for the given email.[PUT request Method]
  - the route will require the email and the 4 didgit code and the NEW password, you also need to remmember to hash the NEW password and edit the password for the the email. make sure code is the same email stored in the database. if you successfully change password you need to delete the code from the user to which the email belongs to. [Delete method]. double check code the email exists and the code is the same code for the user name.
   if existing_user:
    existing_code = User.query.filter_by(email=email, code=code).first() Front -end
    if existing code change the password. 
    if existing code is none than the code is wrong return error 
    

 steps
 
 1. one view to send a recovery email to any given email address. (page type email and send the recovery code to the email)
 2. on this page you will fetch route from step 2.
 3. add a pieramiter in the url for the email    <Route element={<Passwordrecovery />} path="/passwordrecovery/:"email" /> usePrams used on the password recovery view.(how to access the value of the email)
3.1 once email is send <navigate> the user to a NEW view, which is going to be the password recovery page. transffer the email into the NEW view.
 4. on the password recovery page you will take two inputes the code (4 didgit code) and the NEW password.
 5. when you submit the code and NEW password you will make an API call using the route from step 3 on the back-end 
 6. add a pieramiter in the url for the email    <Route element={<Passwordrecovery />} path="/passwordrecovery/:"email" />

 
