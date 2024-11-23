export function setupCulqi(publicKey, monto, order) {
  if (window.Culqi) {
    window.Culqi.publicKey = publicKey;

    window.Culqi.settings({
      currency: 'PEN',
      amount  : monto * 100,   // Monto en céntimos
      order   : order,
    });

    window.Culqi.options({
      paymentMethods: {
        tarjeta   : true,
        bancaMovil: true,
        agente    : true,
        billetera : true,
        cuotealo  : true,
        yape      : true,
      }
    });

    window.Culqi.validationPaymentMethods();
    console.log(window.Culqi.paymentOptionsAvailable);
  }
}
