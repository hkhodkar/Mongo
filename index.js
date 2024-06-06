const mongoose = require("mongoose");

const connectionString =
  "mongodb://root:Aa123456@localhost:27017/?authSource=admin&readPreference=primary&ssl=false";
mongoose
  .connect(connectionString)
  .then(() => console.log("mongo is connected successfully"))
  .catch(console.log);

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isMarried: Boolean,
  salary: Number,
  gender: String,
});

const User = mongoose.model("User", userSchema);

async function storeInformation() {
  const users = [
    {
      name: "mamad",
      age: 32,
      isMarried: false,
      salary: 50000,
      gender: "Male",
    },
    {
      name: "goli",
      age: 28,
      isMarried: false,
      salary: 30000,
      gender: "Female",
    },
    {
      name: "mohsen",
      age: 38,
      isMarried: false,
      salary: 60000,
      gender: "Male",
    },
    {
      name: "pari",
      age: 33,
      isMarried: true,
      salary: 70000,
      gender: "Female",
    },
    {
      name: "sogol",
      age: 22,
      isMarried: false,
      salary: 20000,
      gender: "Female",
    },
  ];
  users.forEach(async (user) => {
    const newUser = new User({
      name: user.name,
      age: user.age,
      isMarried: user.isMarried,
      salary: user.salary,
      gender: user.gender,
    });
    await newUser.save();
  });

  console.log("all users has been add successfully");
}
// uncomment below code to add new users to db
// storeInformation();

async function fetchInformation() {
  const user = await User.findById('6661c005bbcd70e293c9465e');
  if(!user) return;
  user.isMarried = true;
  user.save();
  // const users = (await User.find({isMarried: true}).select('name age').sort('-salary')).limit(2); des sort and select just two
  // const users = (await User.find({isMarried: true}).select('-name -age')); Omit this two filed select rest of them
  console.log(user);
}

fetchInformation();
