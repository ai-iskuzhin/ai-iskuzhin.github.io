import type { Library } from './types'

/**
 * Single source of truth for the open-source .NET SDKs.
 * Drives the home grid, the per-library SEO pages, the sitemap and JSON-LD.
 */
export const libraries: Library[] = [
  {
    slug: 'yookassanet',
    name: 'YooKassaNet',
    repo: 'YooKassaNet',
    nuget: 'YooKassaNet',
    docsUrl: 'https://yookassa.ru/developers/api',
    docsLabel: { ru: 'Документация ЮKassa', en: 'YooKassa API docs' },
    category: { ru: 'Эквайринг', en: 'Acquiring' },
    icon: '/logos/yookassanet.svg',
    accent: ['#7C3AED', '#2563EB'],
    logo: 'nuget',
    tagline: {
      ru: '.NET SDK для API ЮKassa v3',
      en: '.NET SDK for the YooKassa API v3',
    },
    summary: {
      ru: 'Платежи, возвраты, выплаты и безопасные сделки + webhook — одним пакетом. Типизированные перечисления для всех значений протокола, идемпотентность и курсорная постраничность.',
      en: 'Payments, refunds, payouts and safe deals + webhooks — shipped as one package. Typed enums for every protocol value, idempotency and cursor pagination out of the box.',
    },
    targets: ['netstandard2.0', 'net8.0', 'net10.0'],
    license: 'MIT',
    language: 'C#',
    install: 'dotnet add package YooKassaNet',
    quickstart: {
      language: 'csharp',
      code: `using YooKassaNet;
using YooKassaNet.Payments;

using var http = new HttpClient();
var payments = new YooKassaPaymentsClient(http, new YooKassaClientOptions
{
    ShopId = "1281498",
    SecretKey = "test_...",
});

var payment = await payments.CreatePaymentAsync(new CreatePaymentRequest
{
    Amount = Money.Rubles(100m),
    Capture = true,
    Confirmation = Confirmation.Redirect("https://example.com/return"),
    Description = "Order #37",
});

Console.WriteLine(payment.Confirmation?.ConfirmationUrl);`,
    },
    features: [
      { ru: 'Одно- и двухстадийные платежи, отмена и подтверждение', en: 'One- and two-stage payments, capture and cancel' },
      { ru: 'Возвраты и выплаты (включая СБП)', en: 'Refunds and payouts (including SBP)' },
      { ru: 'Безопасные сделки и настройки магазина', en: 'Safe deals and shop settings' },
      { ru: 'Проверка входящих webhook-уведомлений', en: 'Inbound webhook notification verification' },
      { ru: 'Идемпотентность и единый фасад YooKassaClient', en: 'Idempotency and a single YooKassaClient facade' },
    ],
    methods: [
      { name: 'CreatePaymentAsync', desc: { ru: 'Создание платежа', en: 'Create a payment' } },
      { name: 'CapturePaymentAsync', desc: { ru: 'Подтверждение двухстадийного платежа', en: 'Capture a two-stage payment' } },
      { name: 'CreateRefundAsync', desc: { ru: 'Возврат платежа', en: 'Refund a payment' } },
      { name: 'CreatePayoutAsync', desc: { ru: 'Выплата получателю', en: 'Pay out to a recipient' } },
      { name: 'CreateDealAsync', desc: { ru: 'Безопасная сделка', en: 'Create a safe deal' } },
    ],
  },
  {
    slug: 'tbankacquiringnet',
    name: 'TBankAcquiringNet',
    repo: 'TBankAcquiringNet',
    nuget: 'TBankAcquiringNet',
    docsUrl: 'https://www.tbank.ru/kassa/dev/payments/',
    docsLabel: { ru: 'Документация Т-Банк', en: 'T-Bank API docs' },
    category: { ru: 'Эквайринг', en: 'Acquiring' },
    icon: '/logos/tbankacquiringnet.svg',
    accent: ['#FFDD2D', '#2563EB'],
    logo: 'nuget',
    tagline: {
      ru: '.NET SDK для эквайринга Т-Банк (Тинькофф)',
      en: '.NET SDK for T-Bank (Tinkoff) acquiring',
    },
    summary: {
      ru: 'Инициализация платежей, проверка статуса, подтверждение, отмена и возврат, QR/СБП-операции и проверка платёжных уведомлений. Токен SHA-256 вычисляется локально и не покидает приложение как поле запроса.',
      en: 'Initialise payments, check status, confirm, cancel and refund, run QR/SBP operations and verify payment notifications. The SHA-256 token is computed locally and never travels as a request field.',
    },
    targets: ['netstandard2.0', 'net8.0', 'net10.0'],
    license: 'MIT',
    language: 'C#',
    install: 'dotnet add package TBankAcquiringNet',
    quickstart: {
      language: 'csharp',
      code: `using TBankAcquiringNet;

using var httpClient = new HttpClient();
var client = new TBankPaymentsClient(httpClient, new TBankPaymentsClientOptions
{
    TerminalKey = "TinkoffBankTest",
    Password = "YOUR_TERMINAL_PASSWORD",
    Environment = TBankAcquiringEnvironment.Test,
});

var response = await client.InitAsync(new TBankInitPaymentRequest
{
    OrderId = $"order-{Guid.NewGuid():N}",
    Amount = TBankAmount.FromMinorUnits(15000), // 150.00 RUB
    Description = "Test payment",
});

if (response.Success)
    Console.WriteLine(response.PaymentURL);`,
    },
    features: [
      { ru: 'Init / GetState / Confirm / Cancel', en: 'Init / GetState / Confirm / Cancel' },
      { ru: 'Возвраты и проверка заказа', en: 'Refunds and order checks' },
      { ru: 'QR и СБП: статус, список банков, привязка счёта', en: 'QR and SBP: status, bank list, account linking' },
      { ru: 'Проверка уведомлений о статусе платежа', en: 'Payment-status notification verification' },
      { ru: 'Автоматическая генерация SHA-256 Token', en: 'Automatic SHA-256 token generation' },
    ],
    methods: [
      { name: 'InitAsync', desc: { ru: 'Создание платежа', en: 'Initialise a payment' } },
      { name: 'GetStateAsync', desc: { ru: 'Текущий статус платежа', en: 'Current payment status' } },
      { name: 'ConfirmAsync', desc: { ru: 'Подтверждение платежа', en: 'Confirm a payment' } },
      { name: 'CancelAsync', desc: { ru: 'Отмена или возврат', en: 'Cancel or refund' } },
      { name: 'GetQrAsync', desc: { ru: 'QR / СБП оплата', en: 'QR / SBP payment' } },
    ],
  },
  {
    slug: 'tbanknet-b2bqr',
    name: 'TBankNet.B2BQr',
    repo: 'TBankNet.B2BQr',
    nuget: 'TBankNet.B2BQr',
    docsUrl: 'https://developer.tbank.ru/docs/api/post-api-v-1-b-2-b-qr-onetime',
    docsLabel: { ru: 'Документация T-API', en: 'T-API docs' },
    category: { ru: 'Платежи / СБП', en: 'Payments / SBP' },
    icon: '/logos/tbanknet-b2bqr.png',
    accent: ['#FFDD2D', '#2563EB'],
    logo: 'nuget',
    tagline: {
      ru: 'Неофициальный .NET SDK для T-Bank «B2B QR» (СБП)',
      en: 'Unofficial .NET SDK for T-Bank B2B QR (SBP)',
    },
    summary: {
      ru: 'Выставление B2B-ссылок на оплату через СБП: одноразовые и многоразовые ссылки, получение статуса и QR-изображения. Bearer-токен, X-Request-Id и предсказуемая модель ошибок.',
      en: 'Issue B2B payment links over SBP: one-time and reusable links, plus status and QR-image retrieval. Bearer token, X-Request-Id and a predictable error model.',
    },
    targets: ['netstandard2.0', 'net8.0', 'net10.0'],
    license: 'MIT',
    language: 'C#',
    install: 'dotnet add package TBankNet.B2BQr',
    quickstart: {
      language: 'csharp',
      code: `using TBankNet.B2BQr;

using var httpClient = new HttpClient();
var client = new TBankB2BQrClient(httpClient, new TBankB2BQrClientOptions
{
    ApiToken = "YOUR_API_TOKEN",
    Environment = TBankB2BQrEnvironment.Sandbox,
});

var link = await client.CreateOneTimeAsync(new TBankB2BQrOneTimeRequest
{
    AccountNumber = "40802810000000144655",
    Sum = 12345.67m,
    Purpose = "Оплата услуг по договору",
    Ttl = 30,
    Vat = TBankB2BQrVat.Vat22,
});

Console.WriteLine(link.PaymentUrl);`,
    },
    features: [
      { ru: 'Одноразовые ссылки на оплату', en: 'One-time payment links' },
      { ru: 'Многоразовые ссылки на оплату', en: 'Reusable payment links' },
      { ru: 'Статус ссылки и QR-изображение', en: 'Link status and QR image' },
      { ru: 'Среды Sandbox / Production', en: 'Sandbox / Production environments' },
      { ru: 'Разобранная модель ошибок T-API', en: 'Parsed T-API error model' },
    ],
    methods: [
      { name: 'CreateOneTimeAsync', desc: { ru: 'Одноразовая ссылка', en: 'One-time link' } },
      { name: 'CreateReusableAsync', desc: { ru: 'Многоразовая ссылка', en: 'Reusable link' } },
      { name: 'GetAsync', desc: { ru: 'Статус и изображение ссылки', en: 'Link status and image' } },
    ],
  },
  {
    slug: 'tbanknet-junior',
    name: 'TBankNet.Junior',
    repo: 'TBankNet.Junior',
    nuget: 'TBankNet.Junior',
    docsUrl: 'https://developer.tbank.ru/docs/api/get-api-v-3-school-cards',
    docsLabel: { ru: 'Документация T-API', en: 'T-API docs' },
    category: { ru: 'Школьные карты', en: 'School cards' },
    icon: '/logos/tbanknet-junior.png',
    accent: ['#FFDD2D', '#22C55E'],
    logo: 'nuget',
    tagline: {
      ru: 'Неофициальный .NET SDK для T-Bank «Джуниор» (школьные карты)',
      en: 'Unofficial .NET SDK for T-Bank Junior (school cards)',
    },
    summary: {
      ru: 'Работа с API «Джуниор»: список школьных карт и управление школами (список, создание, удаление). Требуется ГОСТ mTLS-сертификат в дополнение к Bearer-токену; предсказуемая модель ошибок.',
      en: 'Work with the Junior API: list school cards and manage schools (list, create, delete). Requires a GOST mTLS certificate alongside the Bearer token; predictable error model.',
    },
    targets: ['netstandard2.0', 'net8.0', 'net10.0'],
    license: 'MIT',
    language: 'C#',
    install: 'dotnet add package TBankNet.Junior',
    quickstart: {
      language: 'csharp',
      code: `using TBankNet.Junior;

// mTLS: attach the GOST certificate to the HttpClient handler.
var handler = new HttpClientHandler();
handler.ClientCertificates.Add(gostClientCertificate);

using var httpClient = new HttpClient(handler);
var client = new TBankJuniorClient(httpClient, new TBankJuniorClientOptions
{
    ApiToken = "YOUR_API_TOKEN",
});

var cards = await client.GetSchoolCardsAsync(
    from: DateTimeOffset.Parse("2024-09-01T00:00:00Z"),
    to: DateTimeOffset.Parse("2024-09-30T23:59:59Z"));

foreach (var card in cards.Cards)
    Console.WriteLine(card.Uid);`,
    },
    features: [
      { ru: 'Список школьных карт', en: 'List school cards' },
      { ru: 'Список, создание и удаление школ', en: 'List, create and delete schools' },
      { ru: 'ГОСТ mTLS + Bearer-токен', en: 'GOST mTLS + Bearer token' },
      { ru: 'Разобранная модель ошибок T-API', en: 'Parsed T-API error model' },
    ],
    methods: [
      { name: 'GetSchoolCardsAsync', desc: { ru: 'Список школьных карт', en: 'List school cards' } },
      { name: 'GetSchoolsAsync', desc: { ru: 'Список школ', en: 'List schools' } },
      { name: 'CreateSchoolsAsync', desc: { ru: 'Создание школ', en: 'Create schools' } },
      { name: 'DeleteSchoolAsync', desc: { ru: 'Удаление школы', en: 'Delete a school' } },
    ],
  },
  {
    slug: 'atolonlinenet',
    name: 'AtolOnlineNet',
    repo: 'AtolOnlineNet',
    nuget: 'AtolOnlineNet',
    docsUrl: 'https://online.atol.ru/',
    docsLabel: { ru: 'АТОЛ Онлайн', en: 'ATOL Online' },
    category: { ru: 'Фискализация', en: 'Fiscalization' },
    icon: '/logos/atolonlinenet.svg',
    accent: ['#22C55E', '#0EA5E9'],
    logo: 'nuget',
    tagline: {
      ru: '.NET SDK для облачной фискализации АТОЛ Онлайн',
      en: '.NET SDK for ATOL Online cloud fiscalization',
    },
    summary: {
      ru: 'Облачная фискализация АТОЛ Онлайн (сервис possystem v4, ФФД 1.05): авторизация, регистрация чеков прихода / расхода / возврата, чеков коррекции и получение результата фискализации. Токен кешируется на 24 часа.',
      en: 'ATOL Online cloud fiscalization (possystem v4 service, FFD 1.05): authorization, sale / expense / refund receipts, correction receipts and fiscalization results. The token is cached for 24 hours.',
    },
    targets: ['netstandard2.0', 'net8.0', 'net10.0'],
    license: 'MIT',
    language: 'C#',
    install: 'dotnet add package AtolOnlineNet',
    quickstart: {
      language: 'csharp',
      code: `using AtolOnlineNet;
using AtolOnlineNet.V1_05;

var options = new AtolOnlineClientOptions
{
    Login = "your-login",
    Password = "your-password",
    GroupCode = "your-group-code",
    BaseAddress = AtolOnlineClientOptions.TestBaseAddress,
};

using var client = new AtolOnlineClient(options);

var registered = await client.SellAsync(new ReceiptRegistrationRequest
{
    ExternalId = Guid.NewGuid().ToString("N"),
    Timestamp = DateTime.Now,
    Receipt = receipt, // items, payments, company, client
});

var report = await client.GetReportAsync(registered.Uuid!);`,
    },
    features: [
      { ru: 'Чеки прихода и расхода', en: 'Sale and expense receipts' },
      { ru: 'Возвраты прихода и расхода', en: 'Sale and expense refunds' },
      { ru: 'Чеки коррекции', en: 'Correction receipts' },
      { ru: 'Опрос результата по UUID', en: 'Poll the result by UUID' },
      { ru: 'Версионно-нейтральный транспорт (готовность к ФФД 1.2)', en: 'Version-neutral transport (FFD 1.2 ready)' },
    ],
    methods: [
      { name: 'SellAsync', desc: { ru: 'Чек «Приход»', en: 'Sale receipt' } },
      { name: 'SellRefundAsync', desc: { ru: 'Чек «Возврат прихода»', en: 'Sale refund receipt' } },
      { name: 'SellCorrectionAsync', desc: { ru: 'Чек коррекции прихода', en: 'Sale correction receipt' } },
      { name: 'GetReportAsync', desc: { ru: 'Результат обработки документа', en: 'Document processing result' } },
    ],
  },
  {
    slug: 'telegramgatewaynet',
    name: 'TelegramGatewayNet',
    repo: 'TelegramGatewayNet',
    nuget: 'TelegramGatewayNet',
    docsUrl: 'https://core.telegram.org/gateway/api',
    docsLabel: { ru: 'Telegram Gateway API', en: 'Telegram Gateway API' },
    category: { ru: 'Верификация / OTP', en: 'Verification / OTP' },
    icon: '/logos/telegramgatewaynet.svg',
    accent: ['#26A5E4', '#2563EB'],
    logo: 'telegram',
    tagline: {
      ru: '.NET SDK для Telegram Gateway API',
      en: '.NET SDK for the Telegram Gateway API',
    },
    summary: {
      ru: 'Доставка кодов подтверждения (OTP) пользователям через Telegram — дешевле и безопаснее SMS. Покрывает все документированные методы Gateway API и проверку подписи отчётов о доставке (webhook).',
      en: 'Deliver verification codes (OTP) to users over Telegram — cheaper and more secure than SMS. Covers every documented Gateway API method plus delivery-report (webhook) signature validation.',
    },
    targets: ['netstandard2.0', 'net8.0', 'net10.0'],
    license: 'MIT',
    language: 'C#',
    install: 'dotnet add package TelegramGatewayNet',
    quickstart: {
      language: 'csharp',
      code: `using TelegramGatewayNet;
using TelegramGatewayNet.Requests;

using var client = new TelegramGatewayClient("YOUR_GATEWAY_API_TOKEN");

var result = await client.SendVerificationMessageAsync(
    new SendVerificationMessageRequest("+391234567890")
    {
        CodeLength = 6,
        Ttl = 60,
        CallbackUrl = "https://my.webhook/auth",
    });

if (result.Ok)
    Console.WriteLine(result.Value.RequestId);
else
    Console.WriteLine($"Could not send: {result.Error}");`,
    },
    features: [
      { ru: 'Отправка кодов подтверждения (OTP)', en: 'Send verification codes (OTP)' },
      { ru: 'Проверка возможности доставки (бесплатно)', en: 'Check send ability (free of charge)' },
      { ru: 'Проверка статуса и отзыв сообщения', en: 'Check status and revoke a message' },
      { ru: 'Валидация подписи webhook-отчётов', en: 'Webhook delivery-report signature validation' },
      { ru: 'Единый результат GatewayResult<T>', en: 'Unified GatewayResult<T> result type' },
    ],
    methods: [
      { name: 'SendVerificationMessageAsync', desc: { ru: 'Отправить код', en: 'Send a code' } },
      { name: 'CheckSendAbilityAsync', desc: { ru: 'Проверить доставимость', en: 'Check deliverability' } },
      { name: 'CheckVerificationStatusAsync', desc: { ru: 'Статус верификации', en: 'Verification status' } },
      { name: 'RevokeVerificationMessageAsync', desc: { ru: 'Отозвать сообщение', en: 'Revoke a message' } },
    ],
  },
  {
    slug: 'mtsidnet',
    name: 'MtsIdNet',
    repo: 'MtsIdNet',
    nuget: 'MtsIdNet',
    docsUrl: 'https://github.com/ai-iskuzhin/MtsIdNet#readme',
    docsLabel: { ru: 'README на GitHub', en: 'README on GitHub' },
    category: { ru: 'Идентификация / OIDC', en: 'Identity / OIDC' },
    icon: '/logos/mtsidnet.png',
    accent: ['#E30611', '#FF5A5A'],
    logo: 'nuget',
    tagline: {
      ru: '.NET SDK для МТС «Мобильный ID» (OIDC/OAuth2)',
      en: '.NET SDK for MTS Mobile ID (OIDC/OAuth2)',
    },
    summary: {
      ru: 'Серверная (CIBA) аутентификация Mobile ID: подписанный объект request для si-authorize, публикация JWKS, обработка SMS-OTP и нотификаций, валидация id_token, данные пользователя (premiuminfo) и верификация (kyc-match-split). Единственная зависимость — System.Text.Json.',
      en: 'Server-initiated (CIBA) Mobile ID auth: a signed request object for si-authorize, JWKS publishing, SMS-OTP and notification handling, id_token validation, user data (premiuminfo) and verification (kyc-match-split). System.Text.Json is the only dependency.',
    },
    targets: ['netstandard2.0', 'net8.0', 'net10.0'],
    license: 'MIT',
    language: 'C#',
    install: 'dotnet add package MtsIdNet',
    quickstart: {
      language: 'csharp',
      code: `using MtsIdNet;

var client = new MtsIdClient(httpClient, new MtsIdClientOptions
{
    ClientId = "mts_test_service",
    SigningKey = MtsKeys.RsaFromPem(File.ReadAllText("sp-private.pem")),
    SigningKeyId = "rsa_kid",
    NotificationUri = "https://service-provider.io/notification_uri/",
});

// Publish your JWKS so Mobile ID can verify the signed request:
string jwksJson = client.BuildPublishedJwks().ToJson();

// Start a server-initiated (CIBA) authentication:
var result = await client.SiAuthorizeAsync(new RequestObjectParameters
{
    Scope = $"{MtsIdConstants.Scopes.OpenId} {MtsIdConstants.Scopes.Authn}",
    LoginHint = RequestObjectParameters.ForMsisdn("+7 915 000 00 00"),
    ClientNotificationToken = Guid.NewGuid().ToString(),
});`,
    },
    features: [
      { ru: 'Подписанный объект request (RS256) для si-authorize', en: 'Signed request object (RS256) for si-authorize' },
      { ru: 'Публикация JWKS на встроенной криптографии', en: 'JWKS publishing on built-in cryptography' },
      { ru: 'Серверная аутентификация (SI / CIBA)', en: 'Server-initiated authentication (SI / CIBA)' },
      { ru: 'Откат на SMS-OTP и валидация id_token', en: 'SMS-OTP fallback and id_token validation' },
      { ru: 'Данные пользователя (premiuminfo) и KYC (kyc-match-split)', en: 'User data (premiuminfo) and KYC (kyc-match-split)' },
    ],
    methods: [
      { name: 'SiAuthorizeAsync', desc: { ru: 'Запуск аутентификации (CIBA)', en: 'Start authentication (CIBA)' } },
      { name: 'BuildPublishedJwks', desc: { ru: 'Публичный JWKS', en: 'Public JWKS' } },
      { name: 'VerifySmsCodeAsync', desc: { ru: 'Проверка SMS-OTP', en: 'Verify SMS-OTP' } },
      { name: 'GetPremiumInfoAsync', desc: { ru: 'Данные пользователя', en: 'User profile data' } },
      { name: 'KycMatchAsync', desc: { ru: 'Верификация данных (KYC)', en: 'Data verification (KYC)' } },
    ],
  },
  {
    slug: 'rsqlparsernet',
    name: 'RsqlParserNet',
    repo: 'RsqlParserNet',
    nuget: 'RsqlParserNet',
    nugetFamily: [
      'RsqlParserNet.Linq',
      'RsqlParserNet.AspNetCore',
      'RsqlParserNet.EntityFrameworkCore',
      'RsqlParserNet.FastEndpoints',
      'RsqlParserNet.OpenApi',
      'RsqlParserNet.Swashbuckle',
      'RsqlParserNet.NSwag',
    ],
    docsUrl: 'https://github.com/ai-iskuzhin/RsqlParserNet#readme',
    docsLabel: { ru: 'README на GitHub', en: 'README on GitHub' },
    category: { ru: 'REST API / запросы', en: 'REST API / querying' },
    icon: '/logos/rsqlparsernet.svg',
    accent: ['#F59E0B', '#7C3AED'],
    logo: 'nuget',
    tagline: {
      ru: 'Парсер RSQL/FIQL-выражений для REST API на .NET',
      en: 'RSQL/FIQL query-expression parser for .NET REST APIs',
    },
    summary: {
      ru: 'Разбирает текст запроса в типизированный AST с диапазонами в исходнике и структурированной диагностикой. Ядро не зависит от ASP.NET Core, LINQ или EF Core. Семейство пакетов добавляет фильтрацию, сортировку, постраничность и документацию OpenAPI.',
      en: 'Parses query text into a typed AST with source spans and structured diagnostics. The core has no dependency on ASP.NET Core, LINQ or EF Core. A family of packages adds filtering, sorting, paging and OpenAPI documentation.',
    },
    targets: ['net10.0'],
    license: 'MIT',
    language: 'C#',
    install: 'dotnet add package RsqlParserNet',
    quickstart: {
      language: 'csharp',
      code: `using RsqlParserNet;

// GET /products?filter=status==active;price=gt=100&sort=-createdAt
if (RsqlParser.TryParse("status==active;price=gt=100", out var query, out var errors))
{
    // walk the typed AST, or apply an allowlisted LINQ profile
    var predicate = profile.ApplyRsql(query);
    var page = await dbContext.Products
        .Where(predicate)
        .ToRsqlPageAsync(page: 1, pageSize: 25);
}
else
{
    return Results.ValidationProblem(errors.ToValidationErrors());
}`,
    },
    features: [
      { ru: 'Типизированный AST с диагностикой', en: 'Typed AST with diagnostics' },
      { ru: 'Allowlist-предикаты для IQueryable<T> (LINQ)', en: 'Allowlisted predicates for IQueryable<T> (LINQ)' },
      { ru: 'Биндинг filter/sort/page в ASP.NET Core', en: 'filter/sort/page binding in ASP.NET Core' },
      { ru: 'Асинхронная постраничность EF Core', en: 'Async EF Core paging helpers' },
      { ru: 'Документация параметров в OpenAPI / Swashbuckle / NSwag', en: 'Query-parameter docs for OpenAPI / Swashbuckle / NSwag' },
    ],
    methods: [
      { name: 'RsqlParser.TryParse', desc: { ru: 'Разбор фильтра в AST', en: 'Parse a filter into the AST' } },
      { name: 'ApplyRsql', desc: { ru: 'Allowlist-предикат для LINQ', en: 'Allowlisted LINQ predicate' } },
      { name: 'ToRsqlPageAsync', desc: { ru: 'Подсчёт и материализация страницы', en: 'Count and materialize a page' } },
    ],
  },
]

export function getLibrary(slug: string): Library | undefined {
  return libraries.find((library) => library.slug === slug)
}
