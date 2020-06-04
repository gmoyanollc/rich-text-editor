const state = () => ({
  firstName: "first-name",
  lastName: "last-name",
  editorContentHtml: "editor-content-html"
});

const getters = {
  getFirstName: state => {
    return state.firstName;
  },
  getLastName: state => {
    return state.lastName;
  },
  getEditorContentHtml: state => {
    return state.editorContentHtml;
  }
};

const mutations = {
  SET_SAMPLE_FORM_STORE(state, payload) {
    state[payload.property] = payload.value;
  }
};

const actions = {
  setSampleFormStore({ commit }, payload) {
    commit("SET_SAMPLE_FORM_STORE", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
