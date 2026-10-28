import SwiftUI
import SafariServices
import Playgrounds

struct ContentView: View {
    @Environment(\.scenePhase) private var scenePhase
    @State private var isEnabled: Bool?

    private let steps = [
        ("gearshape", "設定", "「設定」アプリを開きます"),
        ("safari", "Safari", "「アプリ」→「Safari」を選びます"),
        ("puzzlepiece.extension", "機能拡張", "「機能拡張」→「Comic Fonter」を選びます"),
        ("checkmark.circle", "オン", "「機能拡張を許可」をオンにして、すべての Web サイトで許可します"),
    ]

    var body: some View {
        NavigationStack {
            ScrollView {
                GlassEffectContainer(spacing: 12) {
                    VStack(spacing: 12) {
                        ForEach(steps.indices, id: \.self) { index in
                            step(index)
                        }
                    }
                }
                .padding()
            }
            .safeAreaInset(edge: .bottom) {
                if let isEnabled {
                    Label(isEnabled ? "Comic Fonter は有効です" : "Comic Fonter は無効です", systemImage: isEnabled ? "checkmark.circle.fill" : "xmark.circle.fill")
                        .font(.headline)
                        .foregroundStyle(isEnabled ? .green : .secondary)
                        .padding(.horizontal, 20)
                        .padding(.vertical, 12)
                        .glassEffect(.regular.interactive())
                        .padding()
                }
            }
            .navigationTitle("Fonter")
        }
        .task(id: scenePhase) {
            if scenePhase == .active {
                await refreshState()
            }
        }
    }

    private func refreshState() async {
        guard #available(iOS 26.2, *), let appIdentifier = Bundle.main.bundleIdentifier else { return }
        if let state = try? await SFSafariExtensionManager.stateOfExtension(withIdentifier: appIdentifier + ".extension") {
            isEnabled = state.isEnabled
        }
    }

    private func step(_ index: Int) -> some View {
        let (icon, title, detail) = steps[index]
        return HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.title2)
                .frame(width: 32)
            VStack(alignment: .leading, spacing: 4) {
                Text("\(index + 1). \(title)")
                    .font(.headline)
                Text(detail)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
            Spacer(minLength: 0)
        }
        .padding()
        .glassEffect(.regular.interactive(), in: .rect(cornerRadius: 24))
    }
}

#Preview {
    ContentView()
}

#Playground {
    _ = 1 + 2
}
