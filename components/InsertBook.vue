<template>
  <v-dialog
    v-model="dialog"
    class="text-center fill-height"
    style="overflow: hidden"
    max-width="700"
  >
    <v-card fluid class="pa-4 mt-2">
      <v-card-title>insert</v-card-title>
      <v-card-text>
        <!-- <ValidationObserver
          ref="observer"
          v-slot="{ validate, reset }"
        ></ValidationObserver>-->
        <v-form>
          <v-text-field
            ref="title"
            v-model="MainTitle"
            label="책이름"
            prepend-icon="mdi-book-open-variant"
            type="text"
            outlined
          />
          <v-text-field
            ref="subtitle"
            v-model="SubTitle"
            label="한줄설명"
            prepend-icon="mdi-plus-circle"
            type="text"
            outlined
          />
          <v-textarea
            ref="content"
            v-model="Content"
            label="책내용"
            outlined
            rows="3"
            auto-grow
            row-height="25"
            prepend-icon="mdi-comment-text-multiple-outline"
          ></v-textarea>
          <input ref="inputUpload" @change="onFileSelected" type="file" />
          <!-- <v-file-input
            ref="inputUpload"
            @change="onFileSelected"
            accept="image/*"
            single
            prepend-icon="mdi-file-image"
            outlined
          ></v-file-input>-->
          <!-- <v-card-text>{{ message }}</v-card-text> -->
          <v-select
            ref="category"
            v-model="selectValue"
            :items="selectItems"
            label="category"
            prepend-icon="mdi-format-list-bulleted"
            type="text"
            outlined
          />
          <v-row>
            <v-col cols="12" md="6">
              <v-btn @click="insertBook" color="primary" block dark>Save</v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="clear" block dark>Clear</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import _ from 'lodash'
export default {
  data: () => ({
    user: {},
    dialog: false,
    mainImg: '',
    MainTitle: null,
    SubTitle: null,
    Content: null,
    // message: null,
    selectItems: ['Travel', 'Art', 'WebToon'],
    selectValue: ['Travel', 'Art', 'WebToon']
  }),
  methods: {
    open(data) {
      this.user = _.cloneDeep(data)
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$emit('onClosed')
    },
    cancel() {
      this.dialog = false
    },
    clear() {
      this.MainTitle = ''
      this.SubTitle = ''
      this.Content = ''
      this.mainImg = ''
      this.selectValue = ''
      // this.$refs.observer.reset()
    },
    onFileSelected($event) {
      this.mainImg = this.$refs.inputUpload.files[0]
    },
    insertBook() {
      const valid = this.formValidation()
      if (!valid) return false

      const formData = new FormData()
      formData.append('img', this.mainImg || '')
      formData.append('user_idx', this.user.idx || '')
      formData.append('title', this.MainTitle || '')
      formData.append('sub_title', this.SubTitle || '')
      formData.append('content', this.Content || '')
      formData.append('category', this.selectValue || '')
      // for (const val of formData.values()) {
      //   console.log(val)
      // }
      this.$axios
        .post('/api/posts/insert/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.dialog = false
            this.mainImg = ''
            alert('입력되었습니다.')
            this.clear()
          }
        })

      // const authUser = this.$cookies.get('authUser')
      // try {
      //   const response = await this.$axios.get('/api/posts/insert/', {
      //     params: {
      //       user_idx: this.user.idx,
      //       title: this.MainTitle,
      //       sub_title: this.SubTitle,
      //       content: this.Content,
      //       category: this.selectValue
      //     }
      //   })
      //   this.dialog = false
      //   if (response.request.status === 200) {
      //     alert('저장되었습니다.')
      //     this.redirect()
      //   }
      // } catch (error) {}
    },
    formValidation() {
      if (!this.$refs.title.validate(true)) {
        return false
      }
      if (this.$refs.title.validate(true)) {
        if (!this.$refs.subtitle.validate(true)) {
          return false
        }
        if (!this.$refs.content.validate(true)) {
          return false
        }
        if (!this.$refs.category.validate(true)) {
          return false
        }
      }
      return true
    },
    redirect() {
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
