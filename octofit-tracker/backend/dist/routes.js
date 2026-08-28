import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';
export const apiRouter = Router();
apiRouter.get('/users', async (_request, response, next) => {
    try {
        response.json(await User.find().sort({ name: 1 }));
    }
    catch (error) {
        next(error);
    }
});
apiRouter.post('/users', async (request, response, next) => {
    try {
        response.status(201).json(await User.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
apiRouter.get('/teams', async (_request, response, next) => {
    try {
        response.json(await Team.find().populate('memberIds', 'name email'));
    }
    catch (error) {
        next(error);
    }
});
apiRouter.post('/teams', async (request, response, next) => {
    try {
        response.status(201).json(await Team.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
apiRouter.get('/activities', async (request, response, next) => {
    try {
        const userId = typeof request.query.userId === 'string' ? request.query.userId : undefined;
        const filter = userId ? { userId } : {};
        response.json(await Activity.find(filter).populate('userId', 'name email').sort({ completedAt: -1 }));
    }
    catch (error) {
        next(error);
    }
});
apiRouter.post('/activities', async (request, response, next) => {
    try {
        const activity = await Activity.create(request.body);
        await Leaderboard.findOneAndUpdate({ userId: activity.userId }, { $inc: { points: activity.points } }, { upsert: true, new: true });
        response.status(201).json(activity);
    }
    catch (error) {
        next(error);
    }
});
apiRouter.get('/leaderboard', async (_request, response, next) => {
    try {
        response.json(await Leaderboard.find().populate('userId', 'name avatarUrl').sort({ points: -1 }));
    }
    catch (error) {
        next(error);
    }
});
apiRouter.get('/workouts', async (request, response, next) => {
    try {
        const difficulty = typeof request.query.difficulty === 'string' ? request.query.difficulty : undefined;
        const workouts = Workout.find();
        if (difficulty) {
            workouts.where('difficulty').equals(difficulty);
        }
        response.json(await workouts.sort({ title: 1 }));
    }
    catch (error) {
        next(error);
    }
});
apiRouter.post('/workouts', async (request, response, next) => {
    try {
        response.status(201).json(await Workout.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
