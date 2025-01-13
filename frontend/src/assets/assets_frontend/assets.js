import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import therapist1 from "./doc1.png";
import therapist2 from "./doc2.png";
import therapist3 from "./doc3.png";
import therapist4 from "./doc4.png";
import therapist5 from "./doc5.png";
import therapist6 from "./doc6.png";
import therapist7 from "./doc7.png";
import therapist8 from "./doc8.png";
import therapist9 from "./doc9.png";
import therapist10 from "./doc10.png";
import therapist11 from "./doc11.png";
import therapist12 from "./doc12.png";
import therapist13 from "./doc13.png";
import therapist14 from "./doc14.png";
import therapist15 from "./doc15.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";
import dry_cupping from "./dry_cupping.jpg";
import wet_cupping from "./wet_cupping.jpg";
import fire_cupping from "./fire_cupping.jpg";
import facial_cupping from "./facial_cupping.jpg";
import male_cupping from "./male_cupping.jpg";
import female_cupping from "./female_cupping.jpg";
export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "MALE CUPPING",
    image: male_cupping,
  },
  {
    speciality: "FEMALE CUPPING",
    image: female_cupping,
  },
  {
    speciality: "FACIAL CUPPING",
    image: facial_cupping,
  },
  {
    speciality: "DRY CUPPING",
    image: dry_cupping,
  },
  {
    speciality: "Wet CUPPING",
    image: wet_cupping,
  },
];

export const therapists = [
  {
    _id: "therapist1",
    name: "Dr. Richard James",
    image: therapist1,
    speciality: "Male Cupping",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Richard James specializes in Male Cupping therapy, focusing on relieving pain, improving circulation, and promoting healing through this traditional therapeutic method.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist2",
    name: "Dr. Emily Larson",
    image: therapist2,
    speciality: "Female Cupping",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Emily Larson specializes in Female Cupping therapy, with an emphasis on enhancing female health, improving blood flow, and balancing energy.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist3",
    name: "Dr. Sarah Patel",
    image: therapist3,
    speciality: "Facial Cupping",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Sarah Patel specializes in Facial Cupping, a therapeutic technique aimed at improving skin tone, reducing wrinkles, and enhancing blood circulation in the face.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist4",
    name: "Dr. Christopher Lee",
    image: therapist4,
    speciality: "Dry Cupping",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Christopher Lee offers Dry Cupping therapy, which is known for its benefits in pain relief, muscle relaxation, and promoting better energy flow throughout the body.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist6",
    name: "Dr. Andrew Williams",
    image: therapist6,
    speciality: "Wet Cupping",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Andrew Williams is an expert in Wet Cupping, a method that combines the therapeutic effects of suction and controlled small incisions to release toxins and improve health.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist7",
    name: "Dr. Christopher Davis",
    image: therapist7,
    speciality: "Male Cupping",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Christopher Davis focuses on Male Cupping, offering relief from pain, inflammation, and muscle tension, while boosting overall energy and circulation.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist8",
    name: "Dr. Timothy White",
    image: therapist8,
    speciality: "Female Cupping",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Timothy White specializes in Female Cupping, with a focus on enhancing women’s health, balancing hormones, and promoting relaxation and well-being.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist9",
    name: "Dr. Ava Mitchell",
    image: therapist9,
    speciality: "Facial Cupping",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Ava Mitchell specializes in Facial Cupping, which improves facial circulation, promotes youthful skin, and helps reduce puffiness and wrinkles.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist10",
    name: "Dr. Jeffrey King",
    image: therapist10,
    speciality: "Dry Cupping",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Jeffrey King offers Dry Cupping therapy, which helps in relieving tension, alleviating pain, and promoting better circulation.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist12",
    name: "Dr. Patrick Harris",
    image: therapist12,
    speciality: "Wet Cupping",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Patrick Harris specializes in Wet Cupping therapy, combining suction and small incisions to enhance the body’s natural healing process.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist13",
    name: "Dr. Chloe Evans",
    image: therapist13,
    speciality: "Male Cupping",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Chloe Evans focuses on Male Cupping therapy, offering patients a holistic approach to enhance circulation, relieve stress, and promote overall health.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist14",
    name: "Dr. Ryan Martinez",
    image: therapist14,
    speciality: "Female Cupping",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Ryan Martinez specializes in Female Cupping, helping women manage pain, improve their overall health, and promote relaxation.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "therapist15",
    name: "Dr. Amelia Hill",
    image: therapist15,
    speciality: "Facial Cupping",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Amelia Hill focuses on Facial Cupping to enhance skin tone, reduce signs of aging, and promote a healthy, radiant complexion.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
];
