import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Alex Morgan', email: 'alex.morgan@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=alex' },
      { name: 'Jordan Lee', email: 'jordan.lee@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=jordan' },
      { name: 'Taylor Smith', email: 'taylor.smith@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=taylor' },
      { name: 'Casey Rivera', email: 'casey.rivera@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=casey' },
    ]);

    await Team.create([
      {
        name: 'Morning Striders',
        description: 'A friendly team for consistent morning movement.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Weekend Warriors',
        description: 'Training together and making weekends count.',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    const activities = await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 32, points: 64, completedAt: new Date('2026-08-26T07:15:00Z') },
      { userId: users[1]._id, type: 'cycling', durationMinutes: 45, points: 90, completedAt: new Date('2026-08-26T08:00:00Z') },
      { userId: users[2]._id, type: 'strength', durationMinutes: 40, points: 80, completedAt: new Date('2026-08-25T17:30:00Z') },
      { userId: users[3]._id, type: 'walking', durationMinutes: 28, points: 28, completedAt: new Date('2026-08-25T12:10:00Z') },
      { userId: users[0]._id, type: 'strength', durationMinutes: 25, points: 50, completedAt: new Date('2026-08-24T18:15:00Z') },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, points: activities.filter((activity) => activity.userId.equals(users[0]._id)).reduce((total, activity) => total + activity.points, 0) },
      { userId: users[1]._id, points: 90 },
      { userId: users[2]._id, points: 80 },
      { userId: users[3]._id, points: 28 },
    ]);

    await Workout.create([
      { title: 'Steady State Run', description: 'A conversational-paced run to build aerobic endurance.', difficulty: 'beginner', durationMinutes: 30, activityType: 'running' },
      { title: 'Full Body Foundation', description: 'A balanced strength session using simple movement patterns.', difficulty: 'beginner', durationMinutes: 35, activityType: 'strength' },
      { title: 'Power Intervals', description: 'Short, challenging intervals to improve speed and conditioning.', difficulty: 'advanced', durationMinutes: 25, activityType: 'running' },
      { title: 'Mobility Reset', description: 'Gentle mobility work for hips, shoulders, and spine.', difficulty: 'intermediate', durationMinutes: 20, activityType: 'mobility' },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 5 activities, 4 leaderboard entries, and 4 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
