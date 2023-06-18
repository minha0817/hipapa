import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';


export const generateAdminData = () => {
  const id = uuidv4();
  const name = faker.person.fullName();
  const phone_number = faker.phone.number();
  const email = faker.internet.email();
  const is_active = true;
  const birthday = faker.date.birthdate();
  const daycare_id = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
  return {id, name, email, phone_number, is_active, birthday, daycare_id}
}

export const generateTeacherData = () => {
  const id = uuidv4();
  const name = faker.person.fullName();
  const phone_number = faker.phone.number();
  const email = faker.internet.email();
  const is_active = true;
  const birthday = faker.date.birthdate();
  const daycare_id = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
  return {id, name, email, phone_number, is_active, birthday, daycare_id}
}

export const generateParentData = () => {
  const id = uuidv4();
  const name = faker.person.fullName();
  const phone_number = faker.phone.number();
  const email = faker.internet.email();
  const is_active = true;
  const address = faker.location.streetAddress(true);
  return {id, name, email, phone_number, is_active, address}
}

export const generateChildData = () => {
  const id = uuidv4();
  const name = faker.person.fullName();
  const is_active = true;
  const allergy = "";
  const daycare_id = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";
  const enrolled_day = "2020-09-01"
  const parent_id = "83b22b38-665a-4182-8114-efc7ee0508c3"
  const birthday = faker.date.birthdate({ min: 3, max: 5, mode: 'age' })
  return {id, name, allergy, daycare_id, enrolled_day, is_active, birthday, parent_id}
}