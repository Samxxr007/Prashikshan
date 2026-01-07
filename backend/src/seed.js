import { faker } from "@faker-js/faker";
import { users, studentProfiles, industryProfiles, projects } from "./firebase.js";
import bcrypt from "bcryptjs";

const indianColleges = [
    "IIT Bombay", "IIT Delhi", "Bits Pilani", "DTU", "Anna University",
    "VIT", "NIT Trichy", "Jadavpur University", "Manipal Institute", "SRM Institute"
];

const indianFirstNames = ["Aarav", "Advait", "Ananya", "Arjun", "Diya", "Ishan", "Ishani", "Kabir", "Meera", "Siddharth"];
const indianLastNames = ["Sharma", "Gupta", "Malhotra", "Verma", "Iyer", "Nair", "Reddy", "Patel", "Singh", "Das"];
const indianCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata"];
const companyNames = ["TCS", "Infosys", "Wipro", "HCL", "Reliance Jio", "Zomato", "Swiggy", "Flipkart", "Razorpay"];
const projectTitles = ["AI Traffic Management", "Blockchain Supply Chain", "Tele-medicine Platform", "Smart Water Grid", "E-Governance Portal"];

const seed = async () => {
    console.log("🌱 Seeding database...");

    const passwordHash = await bcrypt.hash("password123", 10);

    // 1. Seed Students
    for (let i = 0; i < 15; i++) {
        const firstName = faker.helpers.arrayElement(indianFirstNames);
        const lastName = faker.helpers.arrayElement(indianLastNames);
        const name = `${firstName} ${lastName}`;
        const email = `student${i}@test.com`;

        await users.doc(email).set({ name, email, password: passwordHash, role: "student", createdAt: Date.now() });
        await studentProfiles.doc(email).set({
            name, email,
            college: faker.helpers.arrayElement(indianColleges),
            course: "Computer Science",
            semester: faker.number.int({ min: 1, max: 8 }).toString(),
            skills: faker.helpers.arrayElements(["React", "Node", "Python", "SQL"], 3),
            bio: faker.lorem.sentence(),
            status: "Active",
            createdAt: Date.now()
        });
    }

    // 2. Seed Companies
    for (let i = 0; i < 10; i++) {
        const companyName = faker.helpers.arrayElement(companyNames) + " " + i;
        const email = `industry${i}@test.com`;

        await users.doc(email).set({ name: companyName, email, password: passwordHash, role: "industry", createdAt: Date.now() });
        await industryProfiles.doc(email).set({
            name: companyName,
            company: companyName,
            email,
            location: faker.helpers.arrayElement(indianCities),
            industry: faker.helpers.arrayElement(["IT Services", "Finance", "E-commerce"]),
            rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
            internships: faker.number.int({ min: 1, max: 10 }),
            bio: "Leading technology firm based in " + faker.helpers.arrayElement(indianCities),
            createdAt: Date.now()
        });

        // 3. Seed Projects for this company
        for (let j = 0; j < 2; j++) {
            await projects.add({
                title: faker.helpers.arrayElement(projectTitles) + " Project",
                description: faker.lorem.paragraph(),
                requiredSkills: faker.helpers.arrayElements(["JavaScript", "Cloud", "Data Science"], 2),
                postedBy: email,
                company: companyName,
                status: "Open",
                applicants: faker.number.int({ min: 0, max: 20 }),
                createdAt: Date.now()
            });
        }
    }

    console.log("✅ Seeding complete!");
    process.exit();
};

seed().catch(err => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
