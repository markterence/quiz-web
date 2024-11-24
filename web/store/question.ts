import { defineStore } from 'pinia';
import QuestionsApi from '@/api/main/app/index';

// Define the state structure
interface QuestionsState {
  questionList: any | null;
}

export const questionAuthStore = defineStore('questions', {
  state: (): QuestionsState => ({
    questionList: null,
  }),

  getters: {
    getQuestions: (state): any | null => {
      return state.questionList;
    },
  },

  actions: {
    getQuestions(query: any): Promise<any> {
      console.log('is this happening?');
      return QuestionsApi.questions.getQuestions(query).then((response) => {
        this.questionList = response.data
        return Promise.resolve(response.data);
      });
    },
  },
});