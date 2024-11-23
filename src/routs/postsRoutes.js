import express from "express";                  // Import the Express framework for building web applications
import multer from "multer";                    // Import the Multer middleware for handling file uploads
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Import controller functions for handling post-related logic
import cors from "cors"; 

const corsOptions={
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {       // Define the destination directory for uploaded files (./uploads in this case)
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {          // Preserve the original filename during upload
    cb(null, file.originalname);
  },
});

const upload = multer({dest: "./uploads", storage });      // Configure Multer using the diskStorage engine and the storage options

const routes = (app) => {
  // Parse incoming JSON data in request bodies
  app.use(express.json());
  app.use(cors(corsOptions));


  // Define routes for handling post-related API requests
  app.get("/posts", listarPosts); // GET request to retrieve posts (implementation in listarPosts controller)
  app.post("/posts", postarNovoPost); // POST request to create a new post (implementation in postarNovoPost controller)

  // Route for uploading an image using Multer middleware
  app.post("/upload", upload.single("imagem"), uploadImagem); // POST request with "imagem" field for the image, handled by uploadImagem controller

  app.put("/upload/:id", atualizarNovoPost);

};

export default routes;