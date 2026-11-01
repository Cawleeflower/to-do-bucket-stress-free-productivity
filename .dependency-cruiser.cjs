/** @type {import("dependency-cruiser").IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "module-internals-are-private",
      comment: "Another module may only import a module's index.ts.",
      severity: "error",
      from: { path: "^apps/api/src/modules/([^/]+)/" },
      to: {
        path: "^apps/api/src/modules/[^/]+/",
        pathNot: ["^apps/api/src/modules/$1/", "^apps/api/src/modules/[^/]+/index\\.ts$"],
      },
    },
    {
      name: "repository-is-the-bottom-layer",
      comment: "routes → service → repository: a repository never calls a service or a route.",
      severity: "error",
      from: { path: "/repository\\.ts$" },
      to: { path: "/(service|routes)\\.ts$" },
    },
    {
      name: "service-does-not-call-routes",
      severity: "error",
      from: { path: "/service\\.ts$" },
      to: { path: "/routes\\.ts$" },
    },
    {
      name: "domain-is-pure",
      comment: "packages/domain imports nothing outside itself.",
      severity: "error",
      from: { path: "^packages/domain/src/" },
      to: { pathNot: "^packages/domain/src/" },
    },
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "not-to-unresolvable",
      severity: "error",
      from: {},
      to: { couldNotResolve: true, pathNot: "^(cloudflare|virtual):" },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: ["(^|/)dist/", "worker-configuration\\.d\\.ts$"] },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "types", "default"],
    },
  },
};
