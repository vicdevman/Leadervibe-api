const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const connectDB = require('../config/database');
const AboutProfile = require('../models/aboutProfile.model');
const logger = require('../utils/logger');

const profiles = [{
        profileId: 'mike-brown',
        photo: {
            src: 'images/Profile-Pic.jpg',
            alt: 'Mike Brown Jr.',
            className: 'img-fluid',
        },
        name: 'Mike Brown, Jr.',
        title: 'Founder | Leadership Disruptor | Visionary Coach',
        email: 'mike@theleadervibe.com',
        bio: `With over 30 years of nonprofit leadership, <strong>Mike Brown</strong> is a nationally recognized voice of truth and transformation. Known as a leadership disruptor, he's raised over <strong>$500 million</strong>, led major organizational turnarounds, and mentored hundreds of leaders. Shaped by personal tragedy and hard-won experience, Mike speaks from the real front lines of leadership — where resilience, clarity, and faith drive change. Through <strong>LeaderVibe</strong>, he helps organizations build mission-driven cultures, lead through crisis, and turn setbacks into impact, proving that kindness and excellence are the foundation of lasting transformation.`,
        bookingText: 'BOOK MIKE TO SPEAK',
        bookingUrl: 'booking.html',
        gallery: [
            { src: 'images/mike&wife.jpeg', alt: 'Mike and Stacy Brown' },
            { src: 'images/IMG_8019 2.jpeg', alt: 'Mike Brown Speaking' },
            { src: 'images/mike&wife.jpg', alt: 'Mike Brown at Event' },
        ],
        awards: [
            '<strong>2005</strong> Springfield College Class Speaker & Presenter',
            '<strong>2007</strong> YMCA Hero Award',
            "<strong>2013</strong> Rockfords Twenty People to Know",
            '<strong>2015</strong> Citizen of the Year',
            '<strong>2015</strong> Maxwell Certification',
            '<strong>2019</strong> Awarded 2nd Master of Science Degree from Capella University',
        ],
        certifications: [
            '<strong>2015 to 2027:</strong> Certified Fundraising Professional, CFRE',
            "<strong>2015:</strong> John Maxwell Certified Coach",
            "<strong>2019:</strong> Master's Degree in Organizational Leadership",
            "<strong>2024:</strong> Liberty University Doctoral Candidate",
        ],
    },
    {
        profileId: 'hayden-alexander',
        photo: {
            src: 'images/hayden.jpg',
            alt: 'Hayden Alexander',
            className: 'img-fluid',
        },
        name: 'Hayden Alexander',
        title: 'Co-Owner | Operations Executive | Young Leader on Fire',
        email: 'hayden@theleadervibe.com',
        bio: `At just 25, <strong>Hayden Alexander</strong> is redefining next-gen leadership. With a Master's in Project Management, leadership experience over 100+ employees in the social services sector, and a background as a college athlete and coach, he blends passion, precision, and purpose in every role. Hayden speaks to emerging leaders and seasoned professionals about operational excellence, servant leadership, and building cultures people want to be part of. Through <strong>LeaderVibe</strong>, he helps teams align priorities, enhance operations, and raise the bar for what young leaders can achieve. His message is simple: you don't have to wait to lead — just show up, work hard, and own your lane.`,
        bookingText: 'BOOK HAYDEN TO SPEAK',
        bookingUrl: 'booking.html',
        gallery: [
            { src: 'images/hayden&mom.jpg', alt: 'Hayden Alexander Speaking' },
            { src: 'images/haydenstage.jpg', alt: 'Hayden Alexander Presenting' },
            { src: 'images/haydenstance.png', alt: 'Hayden Alexander' },
        ],
        awards: [
            '<strong>2005</strong> Springfield College Class Speaker & Presenter',
            '<strong>2007</strong> YMCA Hero Award',
            "<strong>2013</strong> Rockfords Twenty People to Know",
            '<strong>2015</strong> Citizen of the Year',
            '<strong>2015</strong> Maxwell Certification',
            '<strong>2019</strong> Awarded 2nd Master of Science Degree from Capella University',
        ],
        certifications: [
            '<strong>2015 to 2027:</strong> Certified Fundraising Professional, CFRE',
            "<strong>2015:</strong> John Maxwell Certified Coach",
            "<strong>2019:</strong> Master's Degree in Organizational Leadership",
            "<strong>2024:</strong> Liberty University Doctoral Candidate",
        ],
    },
    {
        profileId: 'wyatt-alexander',
        photo: {
            src: 'images/wyatt.jpeg',
            alt: 'Wyatt Alexander',
            className: 'img-fluid',
        },
        name: 'Wyatt Alexander',
        title: 'Co-Owner | Faith-Based Wellness Coach | Fitness & Purpose Mentor',
        email: 'wyatt@theleadervibe.com',
        bio: `At just 20, <strong>Wyatt Alexander</strong> is a rising voice in faith, fitness, and purpose. A bodybuilder, wellness coach, and devoted follower of Christ, he combines physical training with spiritual grounding to help others build strength from the inside out. Wyatt mentors teens, young adults, and men to develop confidence, consistency, and conviction — showing that true health is as much about the soul as it is the body. Through <strong>LeaderVibe</strong>, he leads coaching, group training, and conversations that connect faith and fitness into a powerful path of growth and transformation.`,
        bookingText: 'BOOK WYATT TO SPEAK',
        bookingUrl: 'booking.html',
        gallery: [
            { src: 'images/wyatt2.jpeg', alt: 'Wyatt Alexander Training' },
            { src: 'images/wyatt3.jpeg', alt: 'Wyatt Alexander Coaching' },
            { src: 'images/wyatt4.jpeg', alt: 'Wyatt Alexander' },
        ],
        awards: [
            '<strong>2005</strong> Springfield College Class Speaker & Presenter',
            '<strong>2007</strong> YMCA Hero Award',
            "<strong>2013</strong> Rockfords Twenty People to Know",
            '<strong>2015</strong> Citizen of the Year',
            '<strong>2015</strong> Maxwell Certification',
            '<strong>2019</strong> Awarded 2nd Master of Science Degree from Capella University',
        ],
        certifications: [
            '<strong>2015 to 2027:</strong> Certified Fundraising Professional, CFRE',
            "<strong>2015:</strong> John Maxwell Certified Coach",
            "<strong>2019:</strong> Master's Degree in Organizational Leadership",
            "<strong>2024:</strong> Liberty University Doctoral Candidate",
        ],
    },
    {
        profileId: 'stacy-brown',
        photo: {
            src: 'images/stacy.jpg',
            alt: 'Stacy Brown',
            className: 'img-fluid',
        },
        name: 'Stacy Brown',
        title: 'Partner| Planning & Administrative Lead | Logistics Coordinator',
        email: 'stacy@theleadervibe.com',
        bio: `<strong>Stacy Brown</strong> is the heart behind the scenes at <strong>LeaderVibe </strong> — the planner, organizer, and steady hand ensuring every detail runs smoothly. With decades of experience in high-level executive support, including her role as Senior Administrative Assistant at Lockheed Martin, she keeps events on track and operations seamless. Though she doesn't speak on stage, Stacy's impact is everywhere — from coordinating engagements to creating effortless client experiences. A devoted wife and proud mother, she's the grounding force behind LeaderVibe's growing mission, blending grace, grit, and precision to help the team focus on inspiring change.`,
        bookingText: null,
        bookingUrl: null,
        gallery: [
            { src: 'images/stacy2.png', alt: 'Stacy Brown Speaking' },
            { src: 'images/stacyfrens.jpg', alt: 'Stacy Brown Presenting' },
            { src: 'images/mike&wife.jpeg', alt: 'Stacy Brown' },
        ],
        awards: [],
        certifications: [],
    },
    {
        profileId: 'colby-brown',
        photo: {
            src: 'images/colby-pf.jpeg',
            alt: 'Colby Brown',
            className: 'img-fluid',
        },
        name: 'Colby Brown',
        title: 'Partner| Technology & Sales Strategist| Digital Solutions Lead',
        email: 'colby@theleadervibe.com',
        bio: `At just 20, <strong>Colby Brown</strong> is an entrepreneurial force shaping the future of <strong>LeaderVibe</strong> from behind the scenes. As the tech-savvy backbone of the team, he drives digital infrastructure, website development, analytics, and sales strategy — ensuring the brand is strong, modern, and impactful across every platform. Passionate about using technology to serve others, Colby builds systems that maximize efficiency and amplify impact. Quietly creative and forward-thinking, he represents the next generation of mission-driven entrepreneurs, building the structures that sustain lasting influence.`,
        bookingText: null,
        bookingUrl: null,
        gallery: [
            { src: 'images/colby-sit.jpg', alt: 'Colby Alexander Speaking' },
            { src: 'images/colbysis.jpg', alt: 'Colby Alexander Presenting' },
            { src: 'images/colby-grad.jpeg', alt: 'Colby Alexander' },
        ],
        awards: [],
        certifications: [],
    },
    {
        profileId: 'abbie-brown',
        photo: {
            src: 'images/Abbie.jpg',
            alt: 'Abbie Brown',
            className: 'img-fluid',
        },
        name: 'Abbie Brown',
        title: 'Co-Founder and Life Coach',
        email: 'abbie@theleadervibe.com',
        bio: `<strong>Abbie Brown</strong> is a psychology major and compassionate mentor who helps young people navigate college, life, and<br>personal growth as they discover confidence, balance, and their true sense of self.`,
        bookingText: null,
        bookingUrl: null,
        gallery: [],
        awards: [],
        certifications: [],
    },
];

const seedProfiles = async() => {
    try {
        await connectDB();

        const operations = profiles.map((profile) => ({
            updateOne: {
                filter: { profileId: profile.profileId },
                update: { $set: profile },
                upsert: true,
            },
        }));

        await AboutProfile.bulkWrite(operations);

        logger.info('About profiles seeded successfully');
        process.exit(0);
    } catch (error) {
        logger.error(`Error seeding about profiles: ${error.message}`);
        process.exit(1);
    }
};

seedProfiles();