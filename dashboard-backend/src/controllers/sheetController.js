import { google } from "googleapis";
import dotenv from "dotenv";
import { auth } from "../config/googleAuth.js"; // ✅ Named Import

dotenv.config();
const SPREADSHEET_ID = process.env.SHEET_ID;

// Initialize Google Sheets API client only once
const sheets = google.sheets({ version: "v4", auth });

// Fetch Google Sheets Data
export const getSheetData = async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1",
    });

    res.json({ data: response.data.values });
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

// Add New Row to Google Sheets
export const addSheetRow = async (req, res) => {
  try {
    const { rowData } = req.body; // rowData should be an array of values
    if (!Array.isArray(rowData)) {
      return res.status(400).json({ message: "Invalid data format. rowData should be an array." });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [rowData] },
    });

    res.status(201).json({ message: "Row added successfully" });
  } catch (error) {
    console.error("Error adding data to Google Sheets:", error);
    res.status(500).json({ message: "Failed to add data" });
  }
};
