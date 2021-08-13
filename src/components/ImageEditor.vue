<template>
  <div class="img-editor">
    <el-upload
      v-if="!file"
      class="img-editor__upload"
      drag
      action="#"
      accept="image/*"
      :http-request="onUpload"
      :show-file-list="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <template v-else>
      <el-radio-group
        v-model="curFilter"
        class="img-editor__filters"
        @change="filterImage"
      >
        <el-radio-button
          v-for="filter in filters"
          :key="filter"
          :label="filter"
        ></el-radio-button>
      </el-radio-group>
      <div class="img-editor__img">
        <canvas
          ref="img" />
        <div class="img-editor__opt">
          <el-tooltip content="下载图片" placement="top">
            <el-button
              type="warning"
              icon="el-icon-download"
              circle
              @click="onDownload"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="压缩图片" placement="top">
            <el-button
              type="success"
              icon="el-icon-coin"
              circle
              @click="onCompress"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="更换图片" placement="top">
            <el-upload
              action="#"
              accept="image/*"
              :http-request="onUpload"
              :show-file-list="false"
            >
              <el-button type="primary" icon="el-icon-picture-outline" circle></el-button>
            </el-upload>
          </el-tooltip>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import Filters from './filters'

  export default {
    name: "ImageEditor",

    data() {
      return {
        file: null,
        canvas: null,
        originalImgData: null,
        curFilter: 'Original',
        filters: [
          'Original',
          'GrayScale',
          'Invert',
          'Solarize',
          'Binarize',
          'Oil',
          'Channels',
          'Dither',
          'BoxBlur',
          'GaussianBlur',
          'StackBlur',
          'Mosaic',
          'Sharpen',
          'Enrich',
          'Edge',
          'Emboss',
          'Twril'
        ]
      }
    },

    methods: {
      onUpload({ file }) {
        const url = URL.createObjectURL(file)
        const img = new Image()

        img.onload = () => {
          const { width, height } = img
          const canvas = this.$refs.img
          const ctx = canvas.getContext('2d')

          this.canvas = canvas
          canvas.width = width
          canvas.height = height

          ctx.drawImage(img, 0, 0)
          this.originalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        }
        img.src = url

        this.curFilter = 'Original'
        this.file = file
      },

      filterImage(filter) {
        const ctx = this.canvas.getContext('2d')
        let imgData = this.originalImgData

        switch (filter) {
          case 'Original': break
          case 'Binarize': imgData = Filters['Binarize'](imgData, 0.5)
            break
          case 'Channels': imgData = Filters['Binarize'](imgData)
            break
          case 'Dither': imgData = Filters['Dither'](imgData, 3)
            break
          case 'Oil': imgData = Filters['Oil'](imgData, 2, 32)
            break
          case 'GaussianBlur': imgData = Filters['GaussianBlur'](imgData, 2)
            break
          case 'StackBlur': imgData = Filters['StackBlur'](imgData, 6)
            break
          case 'BoxBlur': imgData = Filters['BoxBlur'](imgData, 3, 3, 2)
            break
          case 'Mosaic': imgData = Filters['Mosaic'](imgData, 12)
            break
          case 'Sharpen': imgData = Filters['Sharpen'](imgData, 3)
            break
          case 'Twril': imgData = Filters['Twril'](imgData, 0.5, 0.5, 150, 400, 'transparent')
            break
          default: imgData = Filters[filter](imgData)
        }

        ctx.putImageData(imgData, 0, 0)
      },

      onDownload() {
        const url = this.canvas.toDataURL()

        this.download(url)
      },

      onCompress() {
        const url = this.canvas.toDataURL("image/jpeg", 0.8)

        this.download(url)
      },

      download(url) {
        const a = document.createElement('a')

        a.href = url
        a.download = this.file.name
        a.click()
      }
    }
  }
</script>

<style lang="less">
  .img-editor {
    width: 100%;
    height: 100%;

    &__upload {
      margin: 30vh auto 0;
    }

    &__filters {
      margin: 15px 0 25px;
    }

    &__img {
      display: flex;
      justify-content: center;

      canvas {
        max-width: 800px;
      }
    }

    &__opt {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 25px;

      .el-button {
        margin: 0 0 14px 0 !important;
      }
    }
  }
</style>
