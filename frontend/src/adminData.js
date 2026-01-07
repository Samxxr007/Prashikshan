import { faker } from "@faker-js/faker";

// Custom Indian Data Pools
const indianColleges = [
    "Indian Institute of Technology (IIT) Bombay",
    "Indian Institute of Technology (IIT) Delhi",
    "Bits Pilani",
    "Delhi Technological University (DTU)",
    "Anna University, Chennai",
    "Vellore Institute of Technology (VIT)",
    "National Institute of Technology (NIT) Trichy",
    "Jadavpur University, Kolkata",
    "Manipal Institute of Technology",
    "SRM Institute of Science and Technology",
    "COEP Technological University",
    "RV College of Engineering, Bangalore",
    "Hindustan Institute of Technology",
    "Thapar Institute of Engineering & Technology",
    "PSG College of Technology, Coimbatore"
];

const indianFirstNames = [
    "Aarav", "Advait", "Ananya", "Arjun", "Diya", "Ishan", "Ishani", "Kabir", "Meera", "Siddharth",
    "Vihaan", "Zara", "Aditi", "Aryan", "Kavya", "Rohan", "Sanya", "Vivaan", "Amara", "Rehaan"
];

const indianLastNames = [
    "Sharma", "Gupta", "Malhotra", "Verma", "Iyer", "Nair", "Reddy", "Patel", "Singh", "Das",
    "Chatterjee", "Kulkarni", "Deshmukh", "Choudhury", "Bose", "Menon", "Joshi", "Kapoor", "Agarwal", "Bahl"
];

const indianCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];

const companyNames = [
    "Tata Consultancy Services (TCS)",
    "Infosys",
    "Wipro",
    "HCL Technologies",
    "Reliance Jio",
    "Zomato",
    "Swiggy",
    "Flipkart",
    "PhonePe",
    "Ola Electric",
    "BharatPe",
    "Razorpay",
    "Freshworks"
];

const projectTitles = [
    "AI-based Traffic Management for Mumbai",
    "Blockchain Supply Chain for Agriculture",
    "Tele-medicine platform for Rural India",
    "Smart Water Grid for Bangalore",
    "E-Governance Portal for UP State",
    "Regional Language Translation AI",
    "FinTech Solution for SME Loans",
    "Solar Grid Monitoring System"
];

export const generateAdminStats = () => ({
    totalStudents: 1250,
    totalProjects: 430,
    totalCompanies: 85,
    pendingApprovals: 24,
});

export const generateAdminStudents = (n = 50) => {
    const students = [];
    for (let i = 0; i < n; i++) {
        const firstName = faker.helpers.arrayElement(indianFirstNames);
        const lastName = faker.helpers.arrayElement(indianLastNames);
        students.push({
            id: faker.string.uuid(),
            name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }),
            college: faker.helpers.arrayElement(indianColleges),
            cgpa: faker.number.float({ min: 7.5, max: 9.9, fractionDigits: 2 }),
            skills: faker.helpers.arrayElements(["React", "Node", "Python", "Java", "AI/ML", "Cloud", "Django", "SQL"], 3).join(", "),
            status: faker.helpers.arrayElement(["Active", "Pending", "Placed"]),
            city: faker.helpers.arrayElement(indianCities)
        });
    }
    return students;
};

export const generateProjectsData = (n = 50) => {
    const projects = [];
    for (let i = 0; i < n; i++) {
        projects.push({
            id: faker.string.uuid(),
            title: faker.helpers.arrayElement(projectTitles) + " " + (i + 1),
            company: faker.helpers.arrayElement(companyNames),
            domain: faker.helpers.arrayElement(["Web Dev", "App Dev", "AI/ML", "Cybersecurity", "Blockchain"]),
            postedOn: faker.date.recent({ days: 30 }).toLocaleDateString(),
            status: faker.helpers.arrayElement(["Open", "Closed", "Ongoing"]),
            applicants: faker.number.int({ min: 5, max: 150 })
        });
    }
    return projects;
};

export const generateCompaniesData = (n = 30) => {
    const companies = [];
    for (let i = 0; i < n; i++) {
        companies.push({
            id: faker.string.uuid(),
            name: faker.helpers.arrayElement(companyNames) + " " + (i + 1),
            location: faker.helpers.arrayElement(indianCities),
            hr: faker.helpers.arrayElement(indianFirstNames) + " " + faker.helpers.arrayElement(indianLastNames),
            internships: faker.number.int({ min: 2, max: 25 }),
            rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
            industry: faker.helpers.arrayElement(["IT Services", "Finance", "Healthcare", "E-commerce"])
        });
    }
    return companies;
};

export const adminStats = generateAdminStats();
export const adminStudentsData = generateAdminStudents(50);
export const adminProjectsData = generateProjectsData(50);
export const adminCompaniesData = generateCompaniesData(30);
