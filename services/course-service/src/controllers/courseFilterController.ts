import { Request, Response } from 'express';
import axios from 'axios';
import Course from '../models/Course';

export const filterCourses = async (req: Request, res: Response) => {
    try {
        const { instructor, minPrice, maxPrice, category, subcategory } = req.query;
        let instructorId;
        if (instructor) {
            // Fetch users and find the matching instructor ID by name (case-insensitive, partial match)
            const usersRes = await axios.get('http://localhost:5000/api/users/');
            const users = usersRes.data;
            const found = users.find((u: any) =>
                u.NAME.toLowerCase().includes((instructor as string).toLowerCase())
            );
            if (found) instructorId = found.USER_ID;
            else return res.json([]); // No match, return empty
        }
        // Build filter object
        const filter: any = { STATUS: true };
        if (instructorId) filter.INSTRUCTOR_ID = instructorId;
        if (minPrice) filter.PRICE = { ...filter.PRICE, $gte: Number(minPrice) };
        if (maxPrice) filter.PRICE = { ...filter.PRICE, $lte: Number(maxPrice) };
        if (category) filter.CATEGORIES = category;
        if (subcategory) filter.SUB_CATEGORIES = subcategory;
        const courses = await Course.find(filter);
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
