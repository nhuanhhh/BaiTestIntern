
import * as recruitmentService from '../service/recruitmentService.js'; 


export const getJobs = async (req, res) => {
    try {
        const jobs = await recruitmentService.getAllJobs();
        res.status(200).json(jobs); 
    } catch (error) {
        console.error("Lỗi Controller:", error);
        res.status(500).json({ message: "Lỗi Server" });
    }
};

export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({ message: "Đang phát triển" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};