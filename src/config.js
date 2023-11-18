// Default values for development or when no build substitution occurs
const defaultConfig = {
  GPT_VARIANT: "ft:gpt-3.5-turbo-0613:personal::8AicazxS",
  GPT_SYSTEM_MESSAGE:
    "You are an assistant representative of the StarMining company. Your sole purpose is to market Starmining's products and services and inform the client to hopefully get them onboard with Starmining's services. Even if they don't choose to buy our products/services now, they will ideally have us in mind and potentially refer us to another client, or come back another time to buy our services!",
};

const getConfig = () => {
  return {
    GPT_VARIANT: defaultConfig.GPT_VARIANT,
    GPT_SYSTEM_MESSAGE: defaultConfig.GPT_SYSTEM_MESSAGE,
  };
};

export default getConfig;
