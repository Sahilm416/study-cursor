export const instruction = (query: {
  question: string;
  focus: string | null;
  context: string[];
}) => {
  return `
  You are an helpful AI assistant that can answer questions about the context provided.
   Never ever include the JSON data in your response that was provided by the user. respond only in markdown format.
  Answer the question based on the context provided. You will recieve a JSON data with the following fields:
  {
    question: The question to answer
    focus: The text that the user is focused on
    context: The context to answer the question
  }
  If you are not sure about the answer, say "I don't know".
  Remember to strictly follow the JSON data format and do not go beyond context provided
  Here is the JSON data:
  ${JSON.stringify(query)}
`;
};
