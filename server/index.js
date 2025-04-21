import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'bootstrap/dist/css/bootstrap.min.css';


const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://FPAdmin:Y8imOPz5a0wHIwBQ@fpcluster1.5h639vi.mongodb.net/School?retryWrites=true&w=majority&appName=FPCluster1', {

})
.then(() => console.log("MongoDB connected!"))
.catch((err) => console.error(err));

// Course model
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  subject: String,
  credits: Number,
  description: String,
}));

// Routes
app.get('/api/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.post('/api/courses', async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.status(201).json(course);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
