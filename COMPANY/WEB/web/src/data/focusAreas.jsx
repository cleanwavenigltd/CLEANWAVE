import React from "react";
import { Book, RefreshCw, Zap, Users, GraduationCap, Leaf } from "lucide-react";

export const FOCUS_AREAS = [
  {
    id: 1,
    title: "Climate Action & Environmental Care",
    desc: "Inspire everyday actions that protect our environment and understand that climate care begins with simple choices.",
    icon: <Book />,
  },
  {
    id: 2,
    title: "Circular Economy & Waste-to-Value",
    desc: "Promote practical ways to reuse, repair, and redesign materials that would have been thrown away. Support ideas that turn plastic, organic waste, and scrap into income and opportunity.",
    icon: <RefreshCw />,
  },
  {
    id: 3,
    title: "Innovation, Technology & Green Startups",
    desc: "Guide young innovators from thought to product. Through mentorship, workspace, and networks, help startups build solutions that solve local problems and create dignified jobs.",
    icon: <Zap />,
  },
  {
    id: 4,
    title: "Education, Skills & Youth Development",
    desc: "Provide hands-on training that prepares young people for today's opportunities as well as focus on skills that matter: digital tools, green trades, creativity, and leadership that build confident futures.",
    icon: <GraduationCap />,
  },
  {
    id: 5,
    title: "Research, Policy & Advocacy",
    desc: "Support studies and conversations that shape better decisions and connect citizens, experts, and leaders so that policies reflect real needs and real experiences.",
    icon: <Users />,
  },
  {
    id: 6,
    title: "Sustainable Agriculture & Agri-Tech",
    desc: "Climate-smart farming to simple agri-tech ideas. Encourage solutions that help farmers produce more with less harm to the land. Enable Agriculture to be treated as business, innovation, and heritage.",
    icon: <Leaf />,
  },
];
