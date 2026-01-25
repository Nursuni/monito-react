import React from "react";
import { Box, Container, Stack, Tabs, Tab } from "@mui/material";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <Container className="max-w-5xl">
        <TabContext value={value}>
          {/* Tabs */}
          <Box className="mb-6 flex justify-center border-b border-gray-200">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="help tabs"
              textColor="primary"
              indicatorColor="primary"
              className="flex space-x-8"
            >
              <Tab
                label="TERMS"
                value="1"
                className="text-gray-800 text-lg font-bold hover:text-blue-600"
              />
              <Tab
                label="FAQ"
                value="2"
                className="text-gray-800 text-lg font-bold hover:text-blue-600"
              />
              <Tab
                label="CONTACT"
                value="3"
                className="text-gray-800 text-lg font-bold hover:text-blue-600"
              />
            </Tabs>
          </Box>

          {/* Main Content */}
          <Stack spacing={8}>
            {/* Terms */}
            <TabPanel value="1" className="!p-0">
              <div className="space-y-3 p-4">
                {terms.map((term, index) => (
                  <p
                    key={index}
                    className="text-gray-800 pl-4 border-l-4 border-blue-500 font-medium"
                  >
                    {term}
                  </p>
                ))}
              </div>
            </TabPanel>

            {/* FAQ */}
            <TabPanel value="2" className="!p-0">
              <div className="space-y-3">
                {faq.map((item, index) => (
                  <Accordion
                    key={index}
                    className="shadow-sm rounded-lg border border-gray-200"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Typography className="font-bold text-gray-800">
                        {item.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text-gray-700 font-normal">
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </TabPanel>

            {/* Contact */}
            <TabPanel value="3" className="!p-0">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md max-w-xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
                  Contact Us
                </h2>
                <p className="text-gray-600 mb-4 text-center text-sm sm:text-base">
                  Fill out the form below to send a message.
                </p>
                <form className="space-y-3">
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="memberNick"
                      placeholder="Type your name here"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Your Email
                    </label>
                    <input
                      type="text"
                      name="memberEmail"
                      placeholder="Type your email here"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Message
                    </label>
                    <textarea
                      name="memberMsg"
                      placeholder="Your message"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="contained"
                      className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-2"
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </div>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
