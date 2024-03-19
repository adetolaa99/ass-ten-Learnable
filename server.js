const express = require("express");
const connectDB = require("./database");
const roomTypesRoutes = require("./routes/room_types");
const roomsRoutes = require("./routes/rooms");

const app = express();

connectDB();

app.use(express.json());

// Routes
app.use("/api/v1/rooms-types", roomTypesRoutes);
app.use("/api/v1/rooms", roomsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
