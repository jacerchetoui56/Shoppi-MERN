const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Inbox = require("../models/inbox.model");

const getInbox = async (req, res) => {
    const { name, email, message, subject } = req.body;
    if (!email || !message || !name) {
        throw new BadRequestError("Please Fill The Form");
    }
    const query = { name, email, message };
    if (subject.length > 0) query.subject = subject;
    const inbox = await Inbox.create({ ...query });
    res
        .status(StatusCodes.OK)
        .json({ success: true, msg: "Message Sent, Thank You!" });
};

module.exports = {
    getInbox,
};
