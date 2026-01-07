import { faker } from "@faker-js/faker";

export function generateStudents(n = 50) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      skills: faker.helpers.arrayElements(
        ["React", "Node", "Java", "MongoDB", "AI", "ML", "Python", "Tailwind"],
        3
      ),
      cgpa: faker.number.float({ min: 6, max: 9.9 }),
      year: faker.number.int({ min: 1, max: 4 }),
      passedOut: faker.number.int({ min: 2023, max: 2027 }),
    });
  }
  return arr;
}

export function generateCompanies(n = 30) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      company: faker.company.name(),
      hr: faker.person.fullName(),
      email: faker.internet.email(),
      domain: faker.company.buzzNoun(),
      internships: faker.number.int({ min: 2, max: 15 }),
    });
  }
  return arr;
}
