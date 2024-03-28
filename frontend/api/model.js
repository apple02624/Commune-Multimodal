export default async function modelHandler(req, res) {
    const response = await fetch('http://localhost:8000/models'); 
    const data = await response.json();
    res.status(200).json(data);
}
