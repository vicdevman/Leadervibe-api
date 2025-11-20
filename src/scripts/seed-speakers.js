const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const connectDB = require('../config/database');
const Speaker = require('../models/speaker.model');
const logger = require('../utils/logger');

const speakers = [{
        speakerId: 'speaker-one',
        photo: {
            src: 'images/mike-pf.jpg',
            alt: 'Mike Brown Jr.',
            className: 'speaker-photo',
        },
        name: 'Mike Brown, Jr.',
        subtitle: 'Founder | National Speaker | Author of Re-Routed',
        bio: '<strong>Mike Brown</strong> is a nationally respected nonprofit executive with 30+ years of leadership experience and over $500 million raised in community support. He delivers impactful keynotes and workshops blending strategy with powerful storytelling.',
        fees: [
            '<strong>Keynotes & Workshops - $5,000 to $15,000</strong> depending on scope and audience size',
            '<strong>Live & Virtual Coaching - $250 to $500 per session or from $2,000 to $6,000 </strong> for multi-session packages.',
            '<strong>Customized Executing Consulting - $10,000 to $50,000 </strong> based on project scope and duration.',
        ],
        note: '<em>Dates book 6–12 months in advance. A 50% deposit secures your event; travel and lodging covered by host.</em>',
        riderHeader: 'MIKE FEATURED TOPICS',
        topics: [
            'Re-Routing Leadership <p>Turning setbacks into strategic comebacks through personal reinvention and bold direction.</p>',
            "Culture Is the New Strategy<p>How to build unshakable organizational culture that outlasts any business model.</p>",
            'Fail Forward <p>Harnessing the power of failure to unlock growth, courage, and clarity.</p>',
            "Mission Over Metrics <p>Re-centering your team's focus on purpose to drive performance and engagement.</p>",
        ],
    },
    {
        speakerId: 'speaker-three',
        photo: {
            src: 'images/wyatt-pf.jpg',
            alt: 'Wyatt Alexander',
            className: 'speaker-photo',
        },
        name: 'Wyatt Alexander',
        subtitle: 'Faith-Based Wellness Coach | Fitness Trainer | Motivational Speaker',
        bio: '<strong>Wyatt Alexander</strong> delivers a powerful message on spiritual strength, discipline, and faith-driven fitness, inspiring youth, men’s groups, student-athletes, and churches.',
        fees: [
            '<strong>Keynotes & Workshops - $2,500 to $7,500</strong> depending on event size and audience size',
            '<strong>Live & Virtual Coaching - $125 to $300 per session or from $1,000 to $3,000 </strong> for multi-session packages.',
            '<strong>Customized Consulting for Emerging Leaders - $2,500 to $15,000 </strong> based on project design and duration.',
        ],
        note: '<em>Includes guided sessions, interactive coaching, and spiritual integration.</em>',
        riderHeader: 'WYATT FEATURED TOPICS',
        topics: [
            'Fit for Purpose: Building a Life on Strength, Spirit, and Discipline<p>Wyatt shares his journey of transformation through faith and fitness—offering a powerful message on how <br> discipline, identity in Christ, and intentional health can reshape how we live and lead.</p>',
            'The Faith-Fueled Life: Wellness for the Mind, Body, and Soul<p>A talk perfect for youth groups, college ministries, and wellness communities,  <br> Wyatt shares how to integrate physical health with faith, mental clarity, and emotional stability for long-term growth.</p>',
            'The Power of Consistency: How Small Decisions Create Big Impact <p>Wyatt breaks down the myth of motivation and teaches how routines, boundaries, <br> and spiritual alignment help people become who they’re meant to be—physically and spiritually.</p>',
        ],
    },
    {
        speakerId: 'speaker-two',
        photo: {
            src: 'images/hayden.jpg',
            alt: 'Hayden Alexander',
            className: 'speaker-photo',
        },
        name: 'Hayden Alexander',
        subtitle: 'Co-Owner | Operations Executive | Young Leader on Fire',
        bio: '<strong>Hayden Alexander</strong> brings practical insight, youthful grit, and executive experience to every stage. As a leader managing 100+ staff and a former college athlete, he inspires young professionals and teams to lead boldly.',
        fees: [
            '<strong>Keynotes & Workshops - $2,500 to $7,500</strong> depending on event size and audience format',
            '<strong>Live & Virtual Coaching - $125 to $300 per session or from $1,000 to $3,000 </strong> for multi-session packages.',
            '<strong>Customized Consulting for Emerging Leaders - $2,500 to $15,000 </strong> based on project scope and duration.',
        ],
        note: '<em>Includes tailored content and audience prep.</em>',
        riderHeader: 'HAYDEN FEATURED TOPICS',
        topics: [
            'Leading From the Middle: Young, Bold, and Ready to Build<p>An empowering message for emerging leaders navigating authority, respect, and high expectations. <br>Hayden unpacks what it means to step into big roles early and deliver results with humility, confidence, and intention.</p>',
            'Grit & Grind: The Playbook for Young Professionals in Leadership<p>This talk blends stories from sports, work, and leadership with real takeaways for pushing through doubt, <br> managing people older than you, and building systems that work—without losing your authenticity.</p>',
            'Operational Excellence: Turning Chaos Into Clarity<p>Perfect for nonprofit teams or business units, Hayden explores the building blocks of strong internal systems, <br> accountability structures, and communication strategies that help teams thrive under pressure.</p>',
        ],
    },
];

const seedSpeakers = async() => {
    try {
        await connectDB();

        const operations = speakers.map((speaker) => ({
            updateOne: {
                filter: { speakerId: speaker.speakerId },
                update: { $set: speaker },
                upsert: true,
            },
        }));

        await Speaker.bulkWrite(operations);

        logger.info('Speakers seeded successfully');
        process.exit(0);
    } catch (error) {
        logger.error(`Error seeding speakers: ${error.message}`);
        process.exit(1);
    }
};

seedSpeakers();