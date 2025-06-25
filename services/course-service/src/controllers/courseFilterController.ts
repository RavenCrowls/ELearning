import { Request, Response } from 'express';
import axios from 'axios';
import Course from '../models/Course';

export const filterCourses = async (req: Request, res: Response) => {
    try {
        const { instructor, minPrice, maxPrice, category, subcategory } = req.query;
        let instructorId;
        if (instructor) {
            // Fetch users and find all matching instructor IDs by name (case-insensitive, partial match)
            const usersRes = await axios.get('http://localhost:5000/api/users/');
            const users = usersRes.data;
            const matchingIds = users
                .filter((u: any) =>
                    u.NAME.toLowerCase().includes((instructor as string).toLowerCase())
                )
                .map((u: any) => u.USER_ID);
            if (matchingIds.length === 0) return res.json([]); // No match, return empty
            // Build filter object
            var filter: any = { STATUS: true, INSTRUCTOR_ID: { $in: matchingIds } };
        } else {
            var filter: any = { STATUS: true };
        }
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
