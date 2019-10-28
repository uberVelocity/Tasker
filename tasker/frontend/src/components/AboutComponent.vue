<template>
  <div>
    <h1>{{title}}</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, repellendus repellat officia est corrupti tempora nesciunt, nobis aliquid delectus deserunt quibusdam nihil nisi porro assumenda quidem praesentium. Asperiores, quidem delectus?
      Mollitia rerum minus nemo omnis sapiente, nisi eligendi impedit molestias adipisci consequuntur possimus porro recusandae repellat ipsam doloremque magnam aperiam, aut suscipit doloribus assumenda eum sequi dicta minima. In, praesentium!
      Eos sunt nostrum minus at inventore, ullam sit nulla quae facere necessitatibus rem reprehenderit alias sed ab officia harum optio neque voluptas tenetur voluptatem natus laborum sint vitae. Molestias, deleniti.
      Aliquid dolorum inventore est neque unde recusandae debitis consequuntur minima suscipit soluta dolorem tempora itaque autem dignissimos quo delectus officia ducimus, magnam ad nostrum enim! Accusamus accusantium totam pariatur voluptatibus.
      Modi quibusdam minus asperiores amet voluptatibus ducimus sed ratione enim vitae dolore ad harum ipsa, blanditiis odio earum delectus, adipisci rem tenetur explicabo corrupti? Unde numquam iure esse odit. Quasi!
      Autem asperiores nisi quasi architecto rerum facilis laborum dicta omnis vel doloremque quas necessitatibus quaerat aperiam facere, eaque, libero itaque quod saepe! Odio id esse quaerat nemo quisquam ullam totam!
      Soluta eos vitae deleniti modi culpa quis numquam velit id fugit. Saepe, commodi animi. Ut dicta soluta facere saepe distinctio et mollitia tenetur iusto non, ratione iste vel labore sunt.
      Ducimus excepturi sit qui exercitationem. Aliquid consequuntur sed reprehenderit fuga eos nihil beatae iste modi nemo ducimus. Blanditiis explicabo, magnam, iusto earum nesciunt deleniti reiciendis facere id, officia harum eveniet.
      Odit consequatur, culpa est perferendis praesentium nobis, maxime sed assumenda cupiditate consectetur quasi vel nesciunt deleniti. Debitis, earum! Corrupti id ad ipsam aliquid in sunt perspiciatis odit possimus voluptates necessitatibus.
      Aliquid commodi, eveniet obcaecati, animi iure sint veritatis repellendus unde tempora atque non pariatur tempore. Tempore voluptates, suscipit sed recusandae maiores commodi placeat fuga quam vel praesentium? Quisquam, dolore qui.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'About'
    };
  }
};
</script>

<style scoped>

div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.server {
  position: relative;
  border: 1px solid #6C63FF;
  background-color: #6C63FF;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

button {
  background-color: #6C63FF;
}
.btn:hover {
  background-color: #352fa1;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

select {
  display: flex;
}

input {
  color: #6C63FF !important;
  border-bottom: 1px solid #6C63FF !important;
  -webkit-box-shadow: 0 1px 0 0 #6C63FF !important;
  box-shadow: 0 1px 0 0 #6C63FF !important;
}

.btn:focus {
  background-color: #6C63FF;
}
</style>