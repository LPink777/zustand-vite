export default {
  extends: ["@commitlint/config-conventional"],
  prompt: {
    settings: {},
    messages: {
      skip: ":skip",
      max: "upper %d chars",
      min: "%d chars at least",
      emptyWarning: "can not be empty",
      upperLimitWarning: "over limit",
      lowerLimitWarning: "below limit",
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: "新功能",
            title: "Features",
            emoji: "✨",
          },
          fix: {
            description: "修复Bug",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          docs: {
            description: "文档更新",
            title: "Documentation",
            emoji: "📚",
          },
          style: {
            description: "代码格式（不影响功能）",
            title: "Styles",
            emoji: "💎",
          },
          refactor: {
            description: "重构（非新增功能或修复bug）",
            title: "Code Refactoring",
            emoji: "📦",
          },
          perf: {
            description: "性能优化",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          test: {
            description: "测试相关",
            title: "Tests",
            emoji: "🚨",
          },
          build: {
            description: "部署相关",
            title: "Builds",
            emoji: "🛠",
          },
          ci: {
            description: "CI相关",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          chore: {
            description: "构建/辅助工具变更",
            title: "Chores",
            emoji: "♻️",
          },
          revert: {
            description: "回滚",
            title: "Reverts",
            emoji: "🗑",
          },
        },
      },
      scope: {
        description: "更改的范围（如组件或文件名）",
      },
      subject: {
        description: "简短描述：用简短的命令时态描述变化",
      },
      body: {
        description: "提供更详细的变更说明",
      },
      isBreaking: {
        description: "有什么重大变化吗？",
      },
      breakingBody: {
        description:
          "重重大更改，提交需要正文。请输入对提交本身的较长描述大更改",
      },
      breaking: {
        description: "描述破环性变化",
      },
      isIssueAffected: {
        description: "这一更改是否会影响任何未决问题？",
      },
      issuesBody: {
        description:
          "如果问题已关闭，则提交需要正文。请输入对提交本身的较长描述",
      },
      issues: {
        description: "添加问题引用（如 “fix #123”、“re #123”）",
      },
    },
  },
};
