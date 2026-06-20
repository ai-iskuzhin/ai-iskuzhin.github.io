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
