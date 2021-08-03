import mongoose from "mongoose";

export const TicketSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true,
  },
  submitted: { type: String, default: null },
  type: { type: String, default: null },
  subject: { type: String, default: null },
  time: { type: String, default: null },
  level: { type: String, default: null },
  budget: { type: String, default: null },
});

export const Ticket = mongoose.model("Ticket", TicketSchema);
