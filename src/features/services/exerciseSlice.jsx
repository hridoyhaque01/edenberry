import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  exercise: [],
  lessons: [],
  courseId: "",
  isSuccess: false,
  isRequestLoading: false,
  isResponseError: false,
  isLessonAddSuccess: false,
  isLessonEditSuccess: false,
};

// fetch course

export const fetchExercise = createAsyncThunk(
  "course/fetchExercise",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/exercises`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

// add new course

export const addExercise = createAsyncThunk(
  "course/addExercise",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/exercises/add`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

// add new lesson

export const addExerciseLesson = createAsyncThunk(
  "course/addExerciseLesson",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/exercises/addlesson/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

// updateExercise new course

export const updateExercise = createAsyncThunk(
  "course/updateExercise",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/exercises/edit/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
// add new course

export const updateExerciseLesson = createAsyncThunk(
  "course/updateExerciseLesson",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/exercises/editlesson/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteExercise = createAsyncThunk(
  "course/deleteExercise",
  async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/exercises/delete/${id}`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteExerciseLesson = createAsyncThunk(
  "course/deleteExerciseLesson",
  async ({ id, lessonIndex }) => {
    const formData = new FormData();
    const data = {
      id: lessonIndex,
    };
    formData.append("data", JSON.stringify(data));
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/exercises/removelesson/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const exerciseSlice = createSlice({
  name: "exerciseSlice",
  initialState,
  reducers: {
    addLocalLessons: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.lessons = action.payload;
      } else {
        state.lessons.push(action.payload);
      }
      state.isLessonAddSuccess = true;
    },
    editLocalLesson: (state, action) => {
      const index = state.lessons?.findIndex(
        (obj) => obj.id === action.payload?.id
      );
      if (index !== -1) {
        state.lessons[index] = action.payload;
      }
      state.isLessonEditSuccess = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExercise.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchExercise.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.exercise = action.payload;
      state.isSuccess = false;
    });
    builder.addCase(fetchExercise.rejected, (state) => {
      state.isError = true;
    });

    // add course
    builder.addCase(addExercise.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(addExercise.fulfilled, (state, action) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
      state.courseId = action.payload?.insertedId;
    });
    builder.addCase(addExercise.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });

    // add course
    builder.addCase(addExerciseLesson.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isLessonAddSuccess = false;
    });
    builder.addCase(addExerciseLesson.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isLessonAddSuccess = true;
    });
    builder.addCase(addExerciseLesson.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isLessonAddSuccess = false;
    });

    // update course
    builder.addCase(updateExercise.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateExercise.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(updateExercise.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });
    // delete course
    builder.addCase(deleteExercise.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(deleteExercise.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteExercise.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });

    // delete course
    builder.addCase(deleteExerciseLesson.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(deleteExerciseLesson.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteExerciseLesson.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });

    // update course
    builder.addCase(updateExerciseLesson.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isLessonEditSuccess = false;
    });
    builder.addCase(updateExerciseLesson.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isLessonEditSuccess = true;
    });
    builder.addCase(updateExerciseLesson.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isLessonEditSuccess = false;
    });
  },
});

export default exerciseSlice.reducer;
export const { addLocalLessons, editLocalLesson } = exerciseSlice.actions;
