function AddCourse() {
  return (
    <div className="container mt-5">
      <h2>Add New Course</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Course Name</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Credits</label>
          <input type="number" className="form-control" equired />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
