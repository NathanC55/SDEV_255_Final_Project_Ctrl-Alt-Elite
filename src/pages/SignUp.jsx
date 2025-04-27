

function SignUp() {
    return(
    <div className="container mt-5">
        <div className="card shadow-lg" style={{maxWidth: '400px', margin: 'auto'}}>
            <div className="card-body">
                <h5 className="card-title text-center mb-4">Sign Up</h5>
                <form>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" required/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" required/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" required/>
                    </div>
                    <button type="submit" className="btn btn-success">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default SignUp;