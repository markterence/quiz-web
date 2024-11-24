import httpClient from '../http-client';
export default class QuestionsApi {
  getQuestions(query: any) {
    return httpClient.get('/questions', {
      params: query,
    });
  }
}